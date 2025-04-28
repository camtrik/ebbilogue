'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import { Trophy, Clock, Calendar } from 'lucide-react'
import { RecentlyPlayedGame } from '@/types/gameCommon'
import { Carousel, Card } from '@/components/gaming/GameCardsCarousel'
import LoadingRecentGames from '@/components/gaming/LoadingRecentGames'
import siteMetadata from '@/data/siteMetadata'

// hours to minutes
function formatPlayTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  return `${hours} hours`
}

// Unix timestamp to date
function formatLastPlayed(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 注意：getMonth() 从 0 开始
  const day = date.getDate()
  return `${year}/${month}/${day}`
  // return date.toLocaleDateString('ja-JP', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // })
}

// default cover when game cover is not found
const DEFAULT_GAME_COVER = siteMetadata.banner.defaultCover

export default function RecentlyPlayedGames() {
  const { t } = useTranslation()
  const [games, setGames] = useState<RecentlyPlayedGame[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (gameId: string) => {
    setImgErrors((prev) => ({
      ...prev,
      [gameId]: true,
    }))
  }

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch('/api/gameAllPlatforms/recentlyPlayed?timeRange=three_months')
        if (!response.ok) throw new Error('fetch recently played games failed')
        const data = await response.json()
        setGames(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentlyPlayed()
  }, [])

  if (isLoading) return <LoadingRecentGames />
  if (error) return <div>Error: {error}</div>
  if (games.length === 0) return <div>Recently Played Games Not found</div>

  const cards = games.map((game, index) => {
    const gameId = `${game.Name}-${game.Platform}`
    const gameContent = (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-500" />
          <span className="text-lg">
            {t('gaming.achievements')}: {game.EarnedAchievements}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span className="text-lg">
            {t('gaming.play_time')}: {formatPlayTime(game.PlayTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-lg">
            {t('gaming.last_played')}: {formatLastPlayed(game.LastPlayedTime)}
          </span>
        </div>
        <a
          href={game.StoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        >
          {t('gaming.store_page')}
        </a>
      </div>
    )

    return (
      <Card
        key={gameId}
        card={{
          src: imgErrors[gameId] ? DEFAULT_GAME_COVER : game.VArtUrl,
          fullSrc: imgErrors[gameId] ? DEFAULT_GAME_COVER : game.ArtUrl,
          title: game.Name,
          category: game.Platform,
          content: gameContent,
          playTime: formatPlayTime(game.PlayTime),
          lastPlayed: formatLastPlayed(game.LastPlayedTime),
        }}
        index={index}
        layout={true}
      />
    )
  })

  return (
    <div className="space-y-6">
      <div className="space-y-2 pb-4 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {t('gaming.recently_played')}
        </h1>
      </div>
      <Carousel items={cards} />
    </div>
  )
}
