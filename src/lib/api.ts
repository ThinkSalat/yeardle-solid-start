import { action, cache, redirect } from "@solidjs/router";
import { Game, Trivia } from "~/models";
import { GameId } from "~/types";
// import { format, isToday } from "date-fns";

export const getRandomGameId = cache( async (): Promise<GameId> => {
  "use server";

  const trivia = Trivia.createRandomTrivia()
  const gameId = Game.encodeId(trivia)

  return gameId
}, "game")
export const getTrivia = cache( async (): Promise<Trivia> => {
  "use server";
  return Trivia.createRandomTrivia()
}, "game")