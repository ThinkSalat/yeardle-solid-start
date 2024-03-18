import { Game, GameResult } from "./Game";

class Player {
  username: string;
  userId: string;
  gameResultsHistory: GameResult[];

  constructor(userId: string) {


  }

  getNextGame(): Game {

  //   getRandomGame that hasn't been seen calculated by taking years that aren't in GameResults and randomly selecting one
  //   getIncompletegames = games that the user has lost, sorted by the largest difference between the closest guess and the actual year. calculated by using GameResults
  //   getCompleteGames that other mixes of trivia items.
  //   getCompleteGames = games that have been won, sorted by the number ofguesses required. If there's a tie it selects a game by checking which original guess was furthest away. calculated with GameResults

  }
  // 
}