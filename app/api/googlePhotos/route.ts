import { NextResponse } from 'next/server'
import { getRandomPhotoUrl } from 'utils/googlePhotos'
export async function GET() {
  try {
    const photoUrl = await getRandomPhotoUrl()
    return NextResponse.json({ photoUrl })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      photoUrl: 'https://picsum.photos/seed/picsum/800/400',
    })
  }
}
