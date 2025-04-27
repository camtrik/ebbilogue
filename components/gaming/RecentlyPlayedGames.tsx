'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import Image from 'next/image'
import { Trophy, Clock, Calendar } from 'lucide-react'
import { RecentlyPlayedGame } from '@/types/gameCommon'

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
    day: 'numeric'
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

export default function RecentlyPlayedGames() {
  const { t } = useTranslation()
  const [games, setGames] = useState<RecentlyPlayedGame[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch('/api/gameAllPlatforms/recentlyPlayed?timeRange=one_month')
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

  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          最近游玩
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={`${game.Name}-${game.Platform}`}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="relative aspect-[16/9]">
              {/* 游戏封面图 */}
              <Image
                src={game.ArtUrl}
                alt={game.Name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

              {/* 成就数量 */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-blue-800/25 px-3 py-1">
                <Trophy className="text-white-400 h-4 w-4" />
                <span className="text-white-400 text-sm font-medium">{game.EarnedAchievements}</span>
              </div>

              {/* 平台图标 */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-blue-800/25 px-3 py-1">
                <Image
                  src={getPlatformIcon(game.Platform)}
                  alt={game.Platform}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <span className="text-white-400 text-sm font-medium">{game.Platform}</span>
              </div>

              {/* 游戏信息 */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex flex-col gap-1">
                  <h3 className="line-clamp-1 text-lg font-bold text-white">{game.Name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="h-4 w-4" />
                    <span>{formatPlayTime(game.PlayTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{formatLastPlayed(game.LastPlayedTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 