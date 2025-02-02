import { Metadata } from 'next'
import TrophyList from '@/components/gaming/TrophyList'
import { genPageMetadata } from 'app/seo'
import GamingProfile from '@/components/gaming/GamingProfile'
import GamingViewProfile from '@/components/gaming/GamingViewProfile'

export const metadata: Metadata = genPageMetadata({ title: 'PSN Trophies' })

export default function TrophiesPage() {
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
      <TrophyList />
    </div>
  )
}
