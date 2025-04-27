import { Metadata } from 'next'
import PSOverview from '../../components/gaming/PSOverview'
import { genPageMetadata } from 'app/seo'
import GamingProfile from '@/components/gaming/GamingProfile'
import GamingViewProfile from '@/components/gaming/GamingViewProfile'
import SteamOverview from '@/components/gaming/SteamOverview'
import RecentlyPlayedGames from '@/components/gaming/RecentlyPlayedGames'

export const metadata: Metadata = genPageMetadata({ title: 'PSN Trophies' })

export default function TrophiesPage() {
  const steamId = process.env.STEAM_ID || ''
  const psnId = process.env.PSN_ID || ''
  const steamURL = 'https://steamcommunity.com/profiles/' + steamId
  const psnURL = 'https://psnprofiles.com/' + psnId
  return (
    <div>
      <GamingProfile
        steamURL={steamURL}
        psnURL={psnURL}
        images={[
          '/static/images/games/warhammer.webp',
          '/static/images/games/maria.jpg',
          '/static/images/games/sekiro.jpg',
          '/static/images/games/ghost-of-tsushima.jpg',
          '/static/images/games/age-of-stars.jpg',
        ]}
      />
      <RecentlyPlayedGames />
      <PSOverview />
      <SteamOverview steamId={steamId} />
      {/* <SteamOverview /> */}
    </div>
  )
}
