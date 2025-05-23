'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'
import { TrophyIcon } from '@/components/gaming/TrophyIcon'
import LoadingTrophy from './LoadingTrophy'
import { ExternalLink } from 'lucide-react'
import { Trophy, TrophyFilters } from '@/types/psn'

export default function PSOverview() {
  const { t } = useTranslation()
  const [trophies, setTrophies] = useState<Trophy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<TrophyFilters>({
    minProgress: 30,
    platform: undefined,
    sortBy: 'progress',
  })

  const psnStoreUrl = 'https://store.playstation.com'

  useEffect(() => {
    const fetchTrophies = async () => {
      try {
        const queryParams = new URLSearchParams({
          minProgress: filters.minProgress.toString(),
          platform: filters.platform || '',
          sortBy: filters.sortBy || '',
        })
        const response = await fetch(`/api/psn/me/trophyTitles?${queryParams.toString()}`)

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
  }, [filters])

  if (isLoading) return <LoadingTrophy />
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
                      {/* Store Link - Right Top */}
                      <a
                        href={psnStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/0 px-2.5 py-1.5 
                          text-white/0 transition-all duration-300 hover:bg-black/70 group-hover/card:bg-black/50 group-hover/card:text-white"
                      >
                        <span className="text-sm">PSN Store</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
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
                      {/* Store Link - Right Top */}
                      <a
                        href={psnStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/0 px-2.5 py-1.5 
                          text-white/0 transition-all duration-300 hover:bg-black/70 group-hover/card:bg-black/50 group-hover/card:text-white"
                      >
                        <span className="text-sm">PSN Store</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
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
                  {/* Progress Badge - Left Top */}
                  <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-sm text-white">
                    {trophy.progress}%
                  </div>
                  {/* Store Link - Right Top */}
                  <a
                    href={psnStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/0 px-2.5 py-1.5 
                      text-white/0 transition-all duration-300 hover:bg-black/70 group-hover:bg-black/50 group-hover:text-white"
                  >
                    <span className="text-sm">PSN Store</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="mb-2 truncate text-lg font-bold text-white">
                      {trophy.trophyTitleName}
                    </h3>
                    <div className="flex items-center space-x-3 text-white">
                      <span className="flex items-center space-x-1">
                        <TrophyIcon type="gold" />
                        <span>{trophy.earnedTrophies.gold}</span>
                        <span className="text-xs text-gray-300">
                          /{trophy.definedTrophies.gold}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrophyIcon type="silver" />
                        <span>{trophy.earnedTrophies.silver}</span>
                        <span className="text-xs text-gray-300">
                          /{trophy.definedTrophies.silver}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrophyIcon type="bronze" />
                        <span>{trophy.earnedTrophies.bronze}</span>
                        <span className="text-xs text-gray-300">
                          /{trophy.definedTrophies.bronze}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
