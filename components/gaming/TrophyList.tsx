'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'
import { TrophyIcon } from '@/components/gaming/TrophyIcon'
import ComingSoon from '@/components/ComingSoon'


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
    sortBy: 'progress',
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
  }, [filters, baseApiUrl])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  // const sortedTrophies = [...trophies].sort((a, b) => b.progress - a.progress)
  const platinumTrophies = trophies.filter((t) => t.earnedTrophies.platinum > 0)
  const nonPlatinumTrophies = trophies.filter((t) => t.earnedTrophies.platinum === 0)

  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Playstation
        </h1>
      </div>

      {/* Platinum Trophy */}
      {platinumTrophies.length > 0 && (
        <div className="relative py-4">
          <h2 className="mb-6 text-3xl font-bold">{t('gaming_platinum')}</h2>
          <div className="relative flex flex-col gap-6">
            <Marquee pauseOnHover className="[--duration:40s]">
              <div className="flex">
                {platinumTrophies.slice(0, Math.ceil(platinumTrophies.length / 2)).map((trophy) => (
                  <div
                    key={trophy.trophyTitleName}
                    className="group/card mx-3 w-80 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 
                      shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl 
                      dark:from-gray-800 dark:to-gray-900"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={trophy.trophyTitleIconUrl}
                        alt={trophy.trophyTitleName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="mb-2 truncate text-xl font-bold text-white">
                          {trophy.trophyTitleName}
                        </h3>
                        <div className="flex items-center space-x-4 text-white">
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="platinum" />
                            <span>{trophy.earnedTrophies.platinum}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="gold" />
                            <span>{trophy.earnedTrophies.gold}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="silver" />
                            <span>{trophy.earnedTrophies.silver}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="bronze" />
                            <span>{trophy.earnedTrophies.bronze}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
            <Marquee pauseOnHover reverse className="[--duration:40s]">
              <div className="flex">
                {platinumTrophies.slice(Math.ceil(platinumTrophies.length / 2)).map((trophy) => (
                  <div
                    key={trophy.trophyTitleName}
                    className="group/card mx-3 w-80 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 
                      shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl 
                      dark:from-gray-800 dark:to-gray-900"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={trophy.trophyTitleIconUrl}
                        alt={trophy.trophyTitleName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="mb-2 truncate text-xl font-bold text-white">
                          {trophy.trophyTitleName}
                        </h3>
                        <div className="flex items-center space-x-4 text-white">
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="platinum" />
                            <span>{trophy.earnedTrophies.platinum}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="gold" />
                            <span>{trophy.earnedTrophies.gold}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="silver" />
                            <span>{trophy.earnedTrophies.silver}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrophyIcon type="bronze" />
                            <span>{trophy.earnedTrophies.bronze}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-950"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-950"></div>
          </div>
        </div>
      )}

      {/* Non-Platinum Games */}
      {nonPlatinumTrophies.length > 0 && (
        <div className="py-8">
          <h2 className="mb-6 text-2xl font-bold">{t('gaming_playing')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {nonPlatinumTrophies.map((trophy) => (
              <div
                key={trophy.trophyTitleName}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 
                  shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl 
                  dark:from-gray-800 dark:to-gray-900"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={trophy.trophyTitleIconUrl}
                    alt={trophy.trophyTitleName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="mb-2 truncate text-lg font-bold text-white">
                      {trophy.trophyTitleName}
                    </h3>
                    <div className="flex items-center space-x-3 text-white">
                      <span className="flex items-center space-x-1">
                        <TrophyIcon type="gold" />
                        <span>{trophy.earnedTrophies.gold}</span>
                        <span className="text-xs text-gray-300">/{trophy.definedTrophies.gold}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrophyIcon type="silver" />
                        <span>{trophy.earnedTrophies.silver}</span>
                        <span className="text-xs text-gray-300">/{trophy.definedTrophies.silver}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrophyIcon type="bronze" />
                        <span>{trophy.earnedTrophies.bronze}</span>
                        <span className="text-xs text-gray-300">/{trophy.definedTrophies.bronze}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 text-sm text-white">
                  {trophy.progress}%
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steam */}
      <div className="py-8">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Steam
        </h1>
        <ComingSoon />
      </div>
    </div>
  )
}
