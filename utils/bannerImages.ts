import fs from 'fs';
import path from 'path';
import siteMetadata from '@/data/siteMetadata';
import { getRandomGooglePhotoUrl } from './googlePhotos';

export async function getRandomPhotoUrl(slug: string): Promise<string> {
	if (siteMetadata.banner.source === 'googlePhotos') {
		return getRandomGooglePhotoUrl(slug);
	}

	try {
		const bannersDir = path.join(process.cwd(), 'public', siteMetadata.banner.localPath)

		if (!fs.existsSync(bannersDir)) {
			console.warn('Warning: Banner directory does not exist at &{bannersDir')
			return siteMetadata.banner.defaultImage
		}

		// read banner images 
		const files = fs.readdirSync(bannersDir)
    const imageFiles = files.filter(file => 
      /\.(jpg|png|jpeg|webp|gif)$/i.test(file)
    )

    if (imageFiles.length === 0) {
      console.warn(`Warning: no banner images found`)
      return siteMetadata.banner.defaultImage
    }

    const hash = Array.from(slug).reduce((acc, char) =>
      ((acc << 5) - acc) + char.charCodeAt(0), 0)
    const index = Math.abs(hash) % imageFiles.length
    
    return `/${siteMetadata.banner.localPath}/${imageFiles[index]}`
	} catch(error) {
		console.error('Error getting local photo: ', error)
    return siteMetadata.banner.defaultImage
	}
}