import { Metadata } from 'next'
import PSOverview from '../../components/gaming/PSOverview'
import { genPageMetadata } from 'app/seo'
import GamingProfile from '@/components/gaming/GamingProfile'
import GamingViewProfile from '@/components/gaming/GamingViewProfile'
import SteamOverview from '@/components/gaming/SteamOverview'

export const metadata: Metadata = genPageMetadata({ title: 'PSN Trophies' })

export default function TrophiesPage() {
  const steamId = process.env.STEAM_ID || ''
  return (
    <div>
      <GamingProfile
        steamURL="https://steamcommunity.com/id/camtrik"
        psnURL="https://psnprofiles.com/camtrik"
        images={[
          '/static/images/games/warhammer.webp',
          '/static/images/games/maria.jpg',
          '/static/images/games/sekiro.jpg',
          '/static/images/games/ghost-of-tsushima.jpg',
          '/static/images/games/age-of-stars.jpg',
        ]}
      />
      <PSOverview />
      <SteamOverview steamId={steamId} />
      {/* <SteamOverview /> */}
    </div>
  )
}
