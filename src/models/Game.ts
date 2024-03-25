import { YEAR_RANGES } from "~/constants";
import { Trivia, TriviaArgs, YearRange } from "~/models"
import { GameId } from "~/types";


const encodeStr = (str: string) => btoa(encodeURIComponent(str))

const decodeStr = (base64: string) => decodeURIComponent(atob(base64))

// Game handles all the gameplay functionality, including grabbing the information from a trivia class that's necessary to play a game.
// need two cases - one where you get the gameId, and one where you generate a random game.
// best option: static method to return a new Game instance after selecting randomnly
export class Game {
  gameId: GameId;
  trivia: Trivia;
  numGuessesAllowed: number;
  guesses: number[];

  constructor(gameId: GameId) {
    this.gameId = gameId
    this.numGuessesAllowed = 8;
    this.trivia = new Trivia(Game.decodeId(gameId))
    this.guesses = []
  }

  // For encode and decode, will need to some basic obscuring
  static decodeId(gameId: GameId): TriviaArgs {
    const [year, indicesString] = decodeStr(gameId).split('_')
    return { year: Number(year), triviaIndices: indicesString.split(',').map(indexStr => Number(indexStr)) }
  }

  static encodeId(trivia: Trivia): GameId {

    const year = trivia.year
    const indices = trivia.triviaIndices
    return encodeStr(`${year}_${indices.toString()}`)
  }

  // will need to address handling all the logic of finding unplayed games when implement user
  // and user history stuff. for now, it can just select a random key
  static createRandomGame(): Game {

    const trivia = Trivia.createRandomTrivia()
    const gameId = Game.encodeId(trivia)

    return new Game(gameId)
  }

  makeGuess(guess: number): YearRange {
    this.guesses.push(guess)
    const difference = Math.abs(this.trivia.year - guess)

    return YEAR_RANGES.find(yearRange => yearRange.numberInRange(difference))!
  }

  getNumGuessesLeft(): number {
    return this.numGuessesAllowed - this.guesses.length
  }

  endGame(): GameResult {
    // make a game result
    const result = new GameResult({ game: this, userId: 'shawn' })
    // Do stuff like add to DB or whatever.
    // If user, needs to add to user's game history.
    // Player.addResult(result)
    return result
  }

  reset() {
    this.guesses = []
  }
  // storeGameResult


}

export class GameResult {
  gameId: GameId;
  userId: string;
  guesses: number[];
  won: boolean;
  closestYear: number
  difficulty: number

  constructor({ game, userId }: { game: Game, userId: string }) {
    this.gameId = game.gameId;
    this.userId = userId;
    this.guesses = game.guesses;

    this.won = game.guesses.at(-1) === game.trivia.year
    this.closestYear = game.guesses.reduce((currentClosestYear, currentYear) => {
      return Math.abs(currentClosestYear - game.trivia.year) < Math.abs(currentYear - game.trivia.year) ? currentClosestYear : currentYear;
    })
    this.difficulty = Math.abs(game.trivia.year - this.closestYear)

  }
  
  static decodeGameResult(str: string) {
    return JSON.parse(decodeStr(str))
  }

  // difficulty (if lost)
  //   sum of lower bounds of guesses
  //   could also just add the difference between the guess and the actual year
  //   or select the lowest difference in guess and the actual year, and reverse that list to get the games they had the most trouble with
  // replayGame()
  //   returns a Game with the gameId
  encodeGameResult() {
    return encodeStr(JSON.stringify({
      guesses: this.guesses,
      won: this.won
    }))
  }
  // history()
  //    list of GameResults with timestamp for this particualy gameid and userid (just the year isn't sufficient because some will have different trivia items)
}

/**
 * Let's go through flow for one game.
 * 1. User guesses 1500
 * 2. makeGuess is called with 1500
 * 3. makeGuess updates numGuessesLeft - 1, gets the difference between the input and the actual year, finds the range that fits, and returns that range.
 * 4. the "input" is update to diplay the number guessed, and the resulting range of makeGuess
 * 5. 3 outcomes: game is won, display winning screen, game is lost, diplay losing screen, game continues and user makes a new guess. repeat.
 */


/**
 * Flow for receiving a link with a score: 
 * 1. person receives a message with the score, and a link to try to beat them
 * 2. the link has the gameId and a query with an encoding of the game the other player played. (mabe also just grab from server?)
 * 3. the person finishes the game and gets the option to see their results in comparsion to their challenger's.
 */

