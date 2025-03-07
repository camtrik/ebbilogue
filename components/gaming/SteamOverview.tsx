'use client'
import { useEffect, useState } from 'react'
import { useTranslation } from 'utils/locale'
import Image from 'next/image'
import { Trophy, Gamepad, Clock, ExternalLink } from 'lucide-react'
import { SteamGame, SteamData, Props } from '@/types/steam'

function formatPlayTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  return `${hours} hours`
}

export default function SteamOverview({ steamId }: Props) {
  const { t } = useTranslation()
  const [allGames, setAllGames] = useState<SteamGame[]>([])
  const [favoriteGames, setFavoriteGames] = useState<SteamGame[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const allGamesResponse = await fetch(`/api/steam/${steamId}/playerGameDetails`)
        if (!allGamesResponse.ok) throw new Error('Failed to fetch Steam games')
        const allGamesData: SteamData = await allGamesResponse.json()
        setAllGames(allGamesData.Games)

        const favGamesResponse = await fetch(
          `/api/steam/${steamId}/playerGameDetails?minPlayTime=3000&sortByTime=true`
        )
        if (!favGamesResponse.ok) throw new Error('Failed to fetch favorite games')
        const favGamesData: SteamData = await favGamesResponse.json()
        setFavoriteGames(favGamesData.Games)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [steamId])

  if (isLoading) return <div className="animate-pulse">Loading...</div>
  if (error) return <div>Error: {error}</div>

  const totalPlayTime = allGames.reduce((acc, game) => acc + game.PlayTime, 0)
  const totalAchievements = allGames.reduce((acc, game) => acc + game.Achieved, 0)

  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Steam
        </h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-blue-900/80 to-blue-800/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <Gamepad className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-md text-blue-300">Games Owned</p>
              <p className="text-2xl font-bold text-blue-100">{allGames.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-purple-900/80 to-purple-800/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-purple-400" />
            <div>
              <p className="text-md text-purple-300">Hours Played</p>
              <p className="text-2xl font-bold text-purple-100">{formatPlayTime(totalPlayTime)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-emerald-400" />
            <div>
              <p className="text-md text-emerald-300">Achievements Earned</p>
              <p className="text-2xl font-bold text-emerald-100">{totalAchievements}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Games */}
      {favoriteGames.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Favorites</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteGames.map((game) => (
              <div
                key={game.AppId}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={game.ArtUrl}
                    alt={game.Name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-blue-800/25 px-3 py-1">
                    <Trophy className="text-white-400 h-4 w-4" />
                    <span className="text-white-400 text-sm font-medium">{game.Achieved}</span>
                  </div>
                  {/* Store Link Indicator */}
                  <a
                    key={game.AppId}
                    href={game.StoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-blue-500/0 px-2 py-1 text-transparent transition-all group-hover:bg-blue-500/20 group-hover:text-white"
                  >
                    <span className="text-sm">View in Store</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={game.IconUrl}
                        alt={`${game.Name} icon`}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                      <div className="group/title relative flex-1">
                        <h3 className="line-clamp-1 text-lg font-bold text-white">{game.Name}</h3>
                        {/* Full title tooltip */}
                        <div className="absolute -top-12 left-0 z-50 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 transition-opacity">
                          {game.Name}
                        </div>
                        <p className="text-sm text-gray-300">{formatPlayTime(game.PlayTime)}</p>
                      </div>
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
