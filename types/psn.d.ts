export interface Trophy {
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

export interface TrophyFilters {
  minProgress: number
  platform?: string
  sortBy?: string
}
