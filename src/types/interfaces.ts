import type { ParticipationModes } from './enums'
export interface Result {
  event_id: number
  number: number
  from: Profile
  to?: Profile
}

export interface Bet {
  event_id: number
  number: number
  user_id: string
  guess: string
}

export interface Event {
  id: number
  date: string
  title: string
  subtitle?: string
  description?: string
  image_url: string
  location?: string
  created_at: Date
  propositions: string[]
  winner: string
  is_finish: boolean
  bettors: number | null
  author: Profile
  allowedDomain: string | null
  type: ParticipationModes
  invite_code: string
  date_finish?: string
  unit: EventUnit
  countBet?: Record<string, number>
}

export enum EventUnit {
  CHOUQUETTE = 'chouquette',
  BEER = 'beer',
}

export interface Profile {
  user_id: string
  username: string
  old_usernames: string[]
}

export interface Punchlines {
  VICTORY: string[]
  DEFEAT: string[]
}

export enum Sport {
  FOOTBALL = 'football',
  BASKETBALL = 'basketball',
  HANDBALL = 'handball',
  RUGBY = 'rugby',
  TENNIS = 'tennis',
  VOLLEYBALL = 'volleyball',
}

export interface Match {
  id: number
  created_at: string
  sport: Sport
  league: string
  date: string
  match: string
  venue: string
  city: string
  team_a: string
  team_b: string
}

export interface LeaderboardLine {
  user_id: string
  username: string
  old_usernames: string[]
  win: number
  lost: number
  score: number
}

export interface Leaderboard extends Array<LeaderboardLine> {}
