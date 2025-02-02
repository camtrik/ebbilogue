'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'

interface Trophy {
  trophyTitleName: string
  trophyTitleIconUrl: string
  trophyTitlePlatform: string
  definedTrophies: {
    bronze: number
    silver: number
    gold: number
    platinum: number
  }
  earnedTrophies: {
    bronze: number
    silver: number
    gold: number
    platinum: number
  }
  progress: number
  lastUpdatedDateTime: string
  playDuration: number
  playCount: number
  category: 'ps4_game' | 'ps5_native_game' | 'pspc_game' | 'unknown'
  lastPlayedDateTime: string | null
  firstPlayedDateTime: string | null
}

interface TrophyFilters {
  minProgress: number
  platform?: string
  sortBy?: string
}

function formatPlayTime(minutes: number): string {
  if (minutes < 60) return `${minutes}分钟`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时`
  const days = Math.floor(hours / 24)
  return `${days}天${hours % 24}小时`
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return '未知'
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function TrophyList() {
  const { t } = useTranslation()
  const [trophies, setTrophies] = useState<Trophy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<TrophyFilters>({
    minProgress: 30,
    platform: undefined,
    sortBy: undefined,
  })
  const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const queryParams = new URLSearchParams({
          minProgress: filters.minProgress.toString(),
          platform: filters.platform || '',
          sortBy: filters.sortBy || '',
        })
        const response = await fetch(
          `${baseApiUrl}/api/psn/me/trophyTitles/filtered?${queryParams.toString()}`
        )

        if (!response.ok) throw new Error('Failed to fetch trophies')
        const data = await response.json()
        setTrophies(data.trophyTitles)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrophies()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const sortedTrophies = [...trophies].sort((a, b) => b.progress - a.progress)
  const platinumTrophies = trophies.filter((t) => t.earnedTrophies.platinum > 0)

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          PSN Trophies
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          My PlayStation Trophy Collection
        </p>
      </div>

      {/* 白金奖杯展示区 */}
      {platinumTrophies.length > 0 && (
        <div className="py-4">
          <h2 className="mb-4 text-2xl font-bold">白金奖杯</h2>
          <Marquee className="py-4" pauseOnHover>
            {platinumTrophies.map((trophy) => (
              <div
                key={trophy.trophyTitleName}
                className="mx-4 flex w-64 flex-col items-center rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
              >
                <div className="relative h-32 w-32">
                  <Image
                    src={trophy.trophyTitleIconUrl}
                    alt={trophy.trophyTitleName}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="mt-2 text-center text-sm font-bold">{trophy.trophyTitleName}</h3>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-platinum">🏆</span>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(trophy.lastUpdatedDateTime)}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      )}

      {/* 所有游戏奖杯列表 */}
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedTrophies.map((trophy) => (
          <div
            key={trophy.trophyTitleName}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
          >
            <div className="relative h-48">
              <Image
                src={trophy.trophyTitleIconUrl}
                alt={trophy.trophyTitleName}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 m-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                {trophy.category === 'ps5_native_game'
                  ? 'PS5'
                  : trophy.category === 'ps4_game'
                    ? 'PS4'
                    : trophy.category === 'pspc_game'
                      ? 'PC'
                      : ''}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <h3 className="mb-2 text-xl font-bold">{trophy.trophyTitleName}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    {trophy.earnedTrophies.platinum > 0 && (
                      <span className="text-platinum">🏆 {trophy.earnedTrophies.platinum}</span>
                    )}
                    <span className="text-gold">🥇 {trophy.earnedTrophies.gold}</span>
                    <span className="text-silver">🥈 {trophy.earnedTrophies.silver}</span>
                    <span className="text-bronze">🥉 {trophy.earnedTrophies.bronze}</span>
                  </div>
                  <span className="text-sm text-gray-500">{trophy.progress}%</span>
                </div>
                {/* {trophy.playDuration > 0 && (
                  <div className="text-sm text-gray-500">
                    <div>游戏时间: {formatPlayTime(trophy.playDuration)}</div>
                    <div>游玩次数: {trophy.playCount}次</div>
                    <div>最近游玩: {formatDateTime(trophy.lastPlayedDateTime)}</div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
