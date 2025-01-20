import { GooglePhotoItem } from '@/types/googlePhotos'
import fetch from 'node-fetch'

const {
  GOOGLE_CLIENT_ID: client_id,
  GOOGLE_CLIENT_SECRET: client_secret,
  GOOGLE_REFRESH_TOKEN: refresh_token,
} = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const PHOTOS_ENDPOINT = 'https://photoslibrary.googleapis.com/v1/mediaItems:search'

export async function getRandomPhotoUrl(): Promise<string> {
  try {
    // Get access token
    const tokenResponse = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    });

    const { access_token } = await tokenResponse.json();

    // Get photos
    const photosResponse = await fetch(PHOTOS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageSize: 100,
      }),
    });

    const data = await photosResponse.json();
    const items = data.mediaItems || [];
    
    if (items.length === 0) {
      return 'https://picsum.photos/seed/picsum/800/400';
    }

    const randomPhoto = items[Math.floor(Math.random() * items.length)];
    return `${randomPhoto.baseUrl}=w800-h600`;
  } catch (error) {
    console.error('Error getting photo:', error);
    return 'https://picsum.photos/seed/picsum/800/400';
  }
}