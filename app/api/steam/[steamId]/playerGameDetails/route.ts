import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { steamId: string } }) {
  try {
    const baseUrl = process.env.GAME_BASE_URL
    const { steamId } = params
    const { searchParams } = new URL(request.url)

    const response = await fetch(
      `${baseUrl}/api/steam/${steamId}/playerGameDetails?${searchParams.toString()}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch steam player game details with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching steam player game details:', error)
    return NextResponse.json({ error: 'Failed to fetch player game details' }, { status: 500 })
  }
}
