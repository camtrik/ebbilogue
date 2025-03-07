import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { accountId: string } }) {
  try {
    const baseUrl = process.env.GAME_BASE_URL
    const { accountId } = params
    // filter params
    const { searchParams } = new URL(request.url)

    const response = await fetch(
      `${baseUrl}/api/psn/${accountId}/trophyTitles?${searchParams.toString()}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch psn trophy titles with status ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching psn trophy titles:', error)
    return NextResponse.json({ error: 'Failed to fetch trophy titles' }, { status: 500 })
  }
}
