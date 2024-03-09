import { triviaItemsByYear } from "./yeardleData";
import { TriviaItemsByYear } from '~/types';


/**
 * 
 * GameId
 *    id: an encoded combination of the year and the 3 indices
 *    getGameInfo: returns { year, indicies = [0,1,2]}
 * 
 * TriviaItem
 *  text
 *  toString this.text
 *     we want to override the thing so referencing the TriviaItem is same as referenceing a string? 
 * 
 * TriviaItemArray
 *  this.array = array of TriviaItems
 * 
 * TriviaPairing
 *    this.trivia = TriviaItemArray
 *    this.year = year
 * 
 * Game
 *    this.gameId = gameId
 *    this.triviaPair = TriviaPairing
 *    decodeId
 *    encodeId
 *    makeGuess
 *    startGame
 *    endGame
 *    storeGameResult
 *    getNextGame
 *      getRandomGame that hasn't been seen calculated by taking years that aren't in GameResults and randomly selecting one
 *      getIncompletegames = games that the user has lost, sorted by the largest difference between the closest guess and the actual year. calculated by using GameResults
 *      getCompleteGames that other mixes of trivia items.
 *      getCompleteGames = games that have been won, sorted by the number ofguesses required. If there's a tie it selects a game by checking which original guess was furthest away. calculated with GameResults
 *        
 * GameResult
 *    gameId
 *    userId
 *    guesses: array of guess
 *    won: true or false
 *    closestYear: 0
 *    difficulty (if lost)
 *      sum of lower bounds of guesses
 *      could also just add the difference between the guess and the actual year
 *      or select the lowest difference in guess and the actual year, and reverse that list to get the games they had the most trouble with
 *    replayGame
 *      returns a Game with the gameId
 *    history
 *       list of GameResults with timestamp for this particualy gameid and userid (just the year isn't sufficient because some will have different trivia items)
 * 
 * GameResultsList? making a class seems dumb, it should just be in a database.
 */


// interface Trivia {
//   triviaItemsByYear: TriviaItemsByYear
// }

// const trivia: Trivia = { triviaItemsByYear }

// trivia.random = () => {

// }


// trivia.getGame = gameId => {


// }

class TriviaItem {
  year: string;
  text: string;

  constructor({ year, text }: TriviaItem) {
    this.year = year;
    this.text = text;
  }
}

class TriviaItems {
  items: TriviaItem[]
  year: string;

  constructor({ items, year }: { year: string, items: string[] }) {
    this.year = year,
    this.items = items
  }
}

class Game {
  year: string;
  trivia: TriviaItems;

  constructor({ year, trivia }: { year: string, trivia: TriviaItems }) {
    this.year = year
    this.trivia = trivia
  }
  
  static decodeId(gameId) {

    return gameId
  }

  static encodeId(gameId) {

    return gameId
  }
  
  startGame() {

  }

  makeGuess() {

  }

  
}

class Trivia {
  triviaItemsByYear: TriviaItemsByYear

  constructor(data: TriviaItemsByYear) {
    this.triviaItemsByYear = data
  }


  random() {
    return this.triviaItemsByYear
  }

  getGame(gameId: string): TriviaItems {
    const { year, indices } = Trivia.decodeId(gameId)

    const items = this.triviaItemsByYear[year]
    return new TriviaItems({
      year,
      indices
    })
  }
}



export default Trivia