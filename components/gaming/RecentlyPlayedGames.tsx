'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import { Trophy, Clock, Calendar } from 'lucide-react'
import { RecentlyPlayedGame } from '@/types/gameCommon'
import { Carousel, Card } from '@/components/ui/apple-cards-carousel'

// 格式化游戏时间（分钟转小时）
function formatPlayTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  return `${hours} 小时`
}

// 格式化Unix时间戳为可读日期
function formatLastPlayed(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 根据平台返回对应的图标
function getPlatformIcon(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'steam':
      return '/static/images/platforms/steam.svg'
    case 'xbox':
      return '/static/images/platforms/xbox.svg'
    case 'playstation':
      return '/static/images/platforms/playstation.svg'
    default:
      return '/static/images/platforms/generic.svg'
  }
}

// 默认游戏封面图
const DEFAULT_GAME_COVER = '/static/gallery/bannersAIGC/00073-441946684.png'

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
        if (!response.ok) throw new Error('获取最近游戏数据失败')
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

  if (isLoading) return <div className="animate-pulse">加载中...</div>
  if (error) return <div>错误: {error}</div>
  if (games.length === 0) return <div>没有找到最近游玩的游戏</div>

  const cards = games.map((game, index) => {
    const gameId = `${game.Name}-${game.Platform}`
    const gameContent = (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-500" />
          <span className="text-lg">已获得 {game.EarnedAchievements} 个成就</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span className="text-lg">游戏时间: {formatPlayTime(game.PlayTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span className="text-lg">最后游玩: {formatLastPlayed(game.LastPlayedTime)}</span>
        </div>
        <a
          href={game.StoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
        >
          查看商店页面
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
    <div className="space-y-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          最近游玩
        </h1>
      </div>
      <Carousel items={cards} />
    </div>
  )
}
