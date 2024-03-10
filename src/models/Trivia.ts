import { getRandomKey } from "~/util/util";
import { triviaItemsByYear } from "../lib/yeardleData"
import { TriviaItem } from '~/types';

export interface TriviaArgs {
  year: number;
  triviaIndices?: number[];
}

// Trivia handles logic and functionality behind a trivia pairing. Trivia includes a trivia pairing as part of the class itself
export class Trivia {
  year: number;
  triviaItems: TriviaItem[];
  triviaIndices: number[];
  allTriviaForYear: TriviaItem[];

  constructor({ year, triviaIndices }: TriviaArgs) {
    this.year = year;
    this.allTriviaForYear = triviaItemsByYear[year]
    this.triviaIndices = triviaIndices || this.selectRandomIndices()
    this.triviaItems = this.getTriviaItems()
  }

  static createRandomTrivia(): Trivia {
    const year = getRandomKey(triviaItemsByYear)
    return new Trivia({ year: Number(year) })
  }
  // For now it's on the instance. Potentially could be useful as static, but where would I access from indices without already having an instance of this class already
  getTriviaItems(): TriviaItem[] {
    return this.triviaIndices.map(index => this.allTriviaForYear[index])
  }

  // makes more sense as an instance
  selectRandomIndices(): number[] {
    if (this.allTriviaForYear.length === 3) {
      return [0, 1, 2]
    }
    const uniqueNumbers: Set<number> = new Set();

    while (uniqueNumbers.size < 3) {
      const randomNumber = Math.floor(Math.random() * this.allTriviaForYear.length - 1);
      uniqueNumbers.add(randomNumber);
    }

    return Array.from(uniqueNumbers).sort((a, b) => Math.sign(a - b));
  }
}
