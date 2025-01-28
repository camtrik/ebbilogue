import fs from 'fs'
import path from 'path'
import siteMetadata from '../data/siteMetadata'
import { v2 as cloudinary } from 'cloudinary'

const {
  GOOGLE_CLIENT_ID: client_id,
  GOOGLE_CLIENT_SECRET: client_secret,
  GOOGLE_REFRESH_TOKEN: refresh_token,
  GOOGLE_PHOTOS_ALBUM_ID: album_id,
} = process.env

const banner_folder = process.env.CLOUDINARY_BANNER_FOLDER

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Google Photos
const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const PHOTOS_ENDPOINT = 'https://photoslibrary.googleapis.com/v1/mediaItems:search'
type PhotoItem = {
  baseUrl: string
  id: string
}

class PhotoManager {
  private static instance: PhotoManager
  private photos: PhotoItem[] = []
  private initialized = false

  private constructor() {}
  static getInstance(): PhotoManager {
    if (!PhotoManager.instance) {
      PhotoManager.instance = new PhotoManager()
    }
    return PhotoManager.instance
  }

  async initialize() {
    if (this.initialized) return

    try {
      // OAuth Authorization: https://developers.google.com/identity/protocols/oauth2/native-app
      const tokenResponse = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
        cache: 'no-cache',
      })

      const { access_token } = await tokenResponse.json()

      // Fetch photos: https://developers.google.com/photos/library/reference/rest
      const response = await fetch(PHOTOS_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageSize: 100,
          albumId: album_id,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status}`)
      }

      const data = await response.json()
      this.photos =
        data.mediaItems?.filter(
          (item) => item.baseUrl && item.mediaMetadata?.width && item.mediaMetadata?.height
        ) || []

      console.log('Google Photos:', this.photos.length, 'photos loaded')
      this.initialized = true
    } catch (error) {
      console.error('Error initializing PhotoManager:', error)
      this.photos = []
      this.initialized = true
    }
  }

  getPhotoFromSlug(slug: string): string {
    if (this.photos.length === 0) {
      return 'https://picsum.photos/seed/picsum/800/400'
    }

    const hash = Array.from(slug).reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    const index = Math.abs(hash) % this.photos.length

    return `${this.photos[index].baseUrl}=d`
  }
}

export const photoManager = PhotoManager.getInstance()

export async function getRandomGooglePhotoUrl(slug: string): Promise<string> {
  await photoManager.initialize()
  return photoManager.getPhotoFromSlug(slug)
}

// Cloudinary
export async function updateCloudinaryUrls() {
  try {
    const result = await cloudinary.search
      // .expression('folder:BannerImages/*')
      .expression(`folder:${banner_folder}/*`)
      .max_results(500)
      .execute()

    const urls = result.resources.map((resource) => ({
      name: resource.public_id.split('/').pop(),
      url: resource.secure_url,
    }))

    fs.writeFileSync(
      path.join(process.cwd(), 'public/bannerUrls.json'),
      JSON.stringify(urls, null, 2)
    )
    console.log('URLs saved, total images:', urls.length)

    return urls
  } catch (error) {
    console.error('Error updating Cloudinary URLs:', error)
    return []
  }
}

let usedBannerIndices: number[] = []

function getAvailableIndex(preferredIndex: number, maxLength: number): number {
  let index = preferredIndex

  // if all indices are used, reset
  if (usedBannerIndices.length >= maxLength) {
    usedBannerIndices = []
  }

  // find the first unused index
  while (usedBannerIndices.includes(index)) {
    index = (index + 5) % maxLength
  }

  // record the used index
  usedBannerIndices.push(index)
  return index
}

export async function getRandomCloudinaryUrl(id: string): Promise<string> {
  try {
    const bannerUrlsPath = path.join(process.cwd(), 'public', 'bannerUrls.json')
    const bannerUrls = JSON.parse(fs.readFileSync(bannerUrlsPath, 'utf8'))

    if (bannerUrls.length === 0) {
      console.warn('Warning: no banner URLs found')
      return siteMetadata.banner.defaultImage
    }

    const hash = Array.from(id).reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    const preferredIndex = Math.abs(hash) % bannerUrls.length

    // get the available index
    const availableIndex = getAvailableIndex(preferredIndex, bannerUrls.length)
    console.log('hash:', Math.abs(hash))
    console.log('preferred index:', preferredIndex)
    console.log('actual used index:', availableIndex)

    return bannerUrls[availableIndex].url
  } catch (error) {
    console.error('Error getting Cloudinary photo: ', error)
    return siteMetadata.banner.defaultImage
  }
}

// Local
export async function getRandomPhotoUrl(id: string): Promise<string> {
  if (siteMetadata.banner.source === 'googlePhotos') {
    return getRandomGooglePhotoUrl(id)
  }

  if (siteMetadata.banner.source === 'cloudinary') {
    return getRandomCloudinaryUrl(id)
  }
  // get banner images from local
  try {
    const bannersDir = path.join(process.cwd(), 'public', siteMetadata.banner.localPath)

    if (!fs.existsSync(bannersDir)) {
      console.warn('Warning: Banner directory does not exist at ${bannersDir}')
      return siteMetadata.banner.defaultImage
    }

    const files = fs.readdirSync(bannersDir)
    const imageFiles = files.filter((file) => /\.(jpg|png|jpeg|webp|gif)$/i.test(file))

    if (imageFiles.length === 0) {
      console.warn(`Warning: no banner images found`)
      return siteMetadata.banner.defaultImage
    }

    const hash = Array.from(id).reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
    const preferredIndex = Math.abs(hash) % imageFiles.length

    const availableIndex = getAvailableIndex(preferredIndex, imageFiles.length)

    return `/${siteMetadata.banner.localPath}/${imageFiles[availableIndex]}`
  } catch (error) {
    console.error('Error getting local photo: ', error)
    return siteMetadata.banner.defaultImage
  }
}
