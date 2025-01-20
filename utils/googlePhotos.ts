const {
    GOOGLE_CLIENT_ID: client_id,
    GOOGLE_CLIENT_SECRET: client_secret,
    GOOGLE_REFRESH_TOKEN: refresh_token,
  } = process.env
  
  const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
  const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
  const PHOTOS_ENDPOINT = 'https://photoslibrary.googleapis.com/v1/mediaItems:search'
  
  export async function getRandomPhotoUrl(slug: string): Promise<string> {
    try {
      const tokenResponse = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
      });
  
      const { access_token } = await tokenResponse.json();
  
      const response = await fetch(PHOTOS_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageSize: 100,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const items = data.mediaItems || [];
      
      if (items.length === 0) {
        return 'https://picsum.photos/seed/picsum/800/400';
      }
  
      // 使用 slug 作为随机种子
      const hash = Array.from(slug).reduce((acc, char) => 
        ((acc << 5) - acc) + char.charCodeAt(0), 0);
      const index = Math.abs(hash) % items.length;
      
      return `${items[index].baseUrl}=d`;
    } catch (error) {
      console.error('Error getting photo:', error);
      return 'https://picsum.photos/seed/picsum/800/400';
    }
  }