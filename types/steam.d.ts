export interface SteamGame {
  AppId: number
  Name: string
  PlayTime: number
  Achieved: number
  TotalAchievenments: number
  IconUrl: string
  ArtUrl: string
  StoreUrl: string
}

export interface SteamData {
  GameCount: number
  Games: SteamGame[]
}

export interface Props {
  steamId: string
}
