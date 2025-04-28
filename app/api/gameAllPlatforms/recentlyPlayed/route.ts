import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const baseUrl = process.env.GAME_BASE_URL
    const { searchParams } = new URL(request.url)
    const response = await fetch(`${baseUrl}/api/unified/recentlyPlayed?${searchParams.toString()}`)

    if (!response.ok) {
      throw new Error(
        `Failed to fetch gameAllPlatforms recentlyPlayed with status ${response.status}`
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching gameAllPlatforms recentlyPlayed:', error)
    return NextResponse.json({ error: 'Failed to fetch recently played games' }, { status: 500 })
  }
}
