import { getValidAuthorization, getValidToken } from '../token'
import {
  getUserTitles,
  makeUniversalSearch,
  getUserPlayedGames,
  getRecentlyPlayedGames,
} from 'psn-api'

export async function GET() {
  try {
    const auth = await getValidAuthorization()

    const targetAccountId = process.env.PSN_ACCOUNT_ID

    console.log('targetAccountId: ', targetAccountId)
    if (!targetAccountId) {
      return new Response('PSN Account ID not configured', { status: 500 })
    }

    const { trophyTitles } = await getUserTitles(auth, targetAccountId)
    // console.log("trophyTitles: ", trophyTitles)

    return new Response(JSON.stringify(trophyTitles), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching PSN trophies:', error)
    return new Response('Failed to fetch trophies', { status: 500 })
  }
}
