import { NextResponse } from 'next/server'
import fetch from 'node-fetch'  // 需要先安装: npm install node-fetch

const {
  GOOGLE_CLIENT_ID: client_id,
  GOOGLE_CLIENT_SECRET: client_secret,
  GOOGLE_REFRESH_TOKEN: refresh_token,
  GOOGLE_PHOTOS_ALBUM_ID: album_id,
} = process.env

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const PHOTOS_ENDPOINT = 'https://photoslibrary.googleapis.com/v1/mediaItems:search'

async function getAccessToken() {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      timeout: 15000  // 15秒超时
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('Starting API request...');
    console.log('Environment check:', {
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      hasRefreshToken: !!refresh_token,
      hasAlbumId: !!album_id,
    });

    const { access_token } = await getAccessToken();
    console.log('Got access token');

    const response = await fetch(PHOTOS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        albumId: album_id,
        pageSize: 100
      }),
      timeout: 15000  // 15秒超时
    });

    if (!response.ok) {
      console.error('Photos API error status:', response.status);
      const errorText = await response.text();
      console.error('Photos API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Got photos data:', {
      itemCount: data.mediaItems?.length ?? 0
    });

    if (!data.mediaItems || data.mediaItems.length === 0) {
      console.log('No photos found, using fallback');
      return NextResponse.json({ 
        photoUrl: 'https://picsum.photos/seed/picsum/800/400' 
      });
    }

    const randomPhoto = data.mediaItems[Math.floor(Math.random() * data.mediaItems.length)];
    const photoUrl = `${randomPhoto.baseUrl}=w800-h600`;
    console.log('Selected photo URL:', photoUrl);
    
    return NextResponse.json({ photoUrl });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ 
      photoUrl: 'https://picsum.photos/seed/picsum/800/400' 
    });
  }
}