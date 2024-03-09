
export type TriviaItem = string;

export type TriviaItems = [TriviaItem, TriviaItem, TriviaItem]

export type TriviaItemsByYear = {
  [key: string]: TriviaItems[]
}