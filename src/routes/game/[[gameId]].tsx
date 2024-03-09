import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { triviaItemsByYear } from "~/lib/yeardleData";

function getRandomKey<T>(obj: T): keyof T;
function getRandomKey<T>(arr: T[]): number;
function getRandomKey<T>(input: T | T[]): keyof T | number | undefined {
  if (Array.isArray(input)) {
    // Input is an array, pick a random index
    return Math.floor(Math.random() * input.length);
  } else {
    // Input is an object, pick a random key
    const keys = Object.keys(input as Record<string, unknown>) as (keyof T)[];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return randomKey;
  }
}

/**
 * getGameInfo takes a gameId or undefined
 * if undefined, makes a request to get a random gameId that (that user hasn't completed)
 * else if defined, decodes the year and trivia items
 * 
 * either way, it returns an objectl ike { year, trivia }
 * 
 */
const getGameInfo = (gameId: string) => {

  return {
    year: 1999,
    trivia: [
      'justin beiver pregnant',
      'jerry springer arrested',
      'spongebob born'
    ]
  }
}

export default function Game() {
  const { gameId } = useParams()

  const { year, trivia } = getGameInfo(gameId)

  console.log({year})
  return (
    <div class="text-center mx-auto text-gray-700 p-4">
      <div>{year}</div>

      <ul>
        <For each={trivia}>
          {triviaItem => <li>{triviaItem}</li>}
        </For>
      </ul>
    </div>
  );
}
