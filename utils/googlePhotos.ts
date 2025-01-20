const {
    GOOGLE_CLIENT_ID: client_id,
    GOOGLE_CLIENT_SECRET: client_secret,
    GOOGLE_REFRESH_TOKEN: refresh_token,
  } = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const PHOTOS_ENDPOINT = 'https://photoslibrary.googleapis.com/v1/mediaItems:search'
type PhotoItem = {
  baseUrl: string;
  id: string;
}

class PhotoManager {
  private static instance: PhotoManager 
  private photos: PhotoItem[] = [];
  private initialized = false;

  private constructor() {}
  static getInstance(): PhotoManager {
    if (!PhotoManager.instance) {
      PhotoManager.instance = new PhotoManager();
    }
    return PhotoManager.instance;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // OAuth Authorization: https://developers.google.com/identity/protocols/oauth2/native-app
      const tokenResponse = await fetch(TOKEN_ENDPOINT, {
        method: 'POST', 
        headers: {
          Authorization: `Basic ${token}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      });

      const { access_token } = await tokenResponse.json(); 

      // Fetch photos: https://developers.google.com/photos/library/reference/rest
      const response = await fetch(PHOTOS_ENDPOINT, {
        method: 'POST', 
        headers: {
          Authorization: `Bearer ${access_token}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pageSize: 100, 
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status}`);
      }

      const data = await response.json();
      this.photos = data.mediaItems?.filter(item =>
        item.baseUrl &&
        item.mediaMetadata?.width &&
        item.mediaMetadata?.height 
      ) || [];

      console.log('Google Photos:', this.photos.length, 'photos loaded')
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing PhotoManager:', error);
      this.photos = [];
      this.initialized = true;
    }
  }

  getPhotoFromSlug(slug: string): string {
    if (this.photos.length === 0) {
      return 'https://picsum.photos/seed/picsum/800/400';
    }

    const hash = Array.from(slug).reduce((acc, char) =>
      ((acc << 5) - acc) + char.charCodeAt(0), 0);
    const index = Math.abs(hash) % this.photos.length;

    return `${this.photos[index].baseUrl}=d`
  }
}

export const photoManager = PhotoManager.getInstance()

export async function getRandomPhotoUrl(slug: string): Promise<string> {
  await photoManager.initialize()
  return photoManager.getPhotoFromSlug(slug)
}
