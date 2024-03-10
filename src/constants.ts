import { YearRange } from "~/models/YearRange"
import { GameId } from "./types"

export const routes = {
  home: "/",
  about: "/about",
  play: "/game",
  game: (gameId: GameId) => `/game/${gameId}`
}

export const YEAR_RANGES = [
  new YearRange(0, 0),
  new YearRange(1, 2),
  new YearRange(3, 10),
  new YearRange(11, 40),
  new YearRange(41, 200),
  new YearRange(200, Infinity)
]

export const MIN_YEAR = -4000
export const MAX_YEAR = new Date().getFullYear()