import { useParams, createAsync } from "@solidjs/router";
import { For, createEffect, createSignal, Accessor } from "solid-js";
import GuessInput from "~/components/GuessInput";
import { MAX_YEAR, MIN_YEAR } from "~/constants";
import { getRandomGameId, getTrivia } from "~/lib/api";
import { triviaItemsByYear } from "~/lib/yeardleData";
import { Game, YearRange } from "~/models";

function GameTimeline({ guesses }: { guesses: Accessor<[number, YearRange][]> }) {
  const minRange = () => Math.min(...guesses().map(([year]) => year)) - 200
  const maxRange = () => Math.max(...guesses().map(([year]) => year)) + 200

  return (
    <div style={{ position: 'relative', height: '100px', border: '1px solid #ccc' }}>
      <For each={guesses()}>
        {([year]) => (
          <div style={{
            position: 'absolute',
            left: `${((year - minRange()) / (maxRange() - minRange())) * 100}%`,
            top: '50%',
            "font-size": 'larger',
            transform: 'translateX(-50%)',
            padding: '2px',
            "border-radius": '5px',
            "background-color": 'beige'
          }}>{year}</div>
        )}
      </For>
    </div>
  );
}

function TriviaItem({ text }: { text: string }) {
  return (
    <li>{text}</li>
  )
}

function GuessResult({ guess, range }: { guess: number, range: YearRange }) {

  return (
    <li>
      <div>{guess}</div>
      <div>{range.toString()}</div>
    </li>
  )
}

export default function GameContainer() {
  let { gameId } = useParams()
  const game = gameId ? new Game(gameId) : Game.createRandomGame()

  const [guesses, setGuesses] = createSignal<[number, YearRange][]>([])
  const [isGameOver, setIsGameOver] = createSignal(false)

  console.log(game, game.guesses)
  const makeGuess = (guess: number) => {
    const range = game.makeGuess(guess)
    // if win, do something here
    setGuesses(arr => [...arr, [guess, range]])
    if (range.low === 0 || game.getNumGuessesLeft() === 0) {
      game.endGame()
      setIsGameOver(true)
    }
  }
  return (
    <div class="text-center mx-auto text-gray-700 p-4">
      <ul>
        <For each={game.trivia.triviaItems}>
          {triviaItem => <TriviaItem text={triviaItem} />}
        </For>
      </ul>

      <GameTimeline guesses={guesses} />
      <ul>
        <For each={guesses()}>
          {([guess, range]) => <GuessResult guess={guess} range={range} /> }
        </For>
      </ul>

      <GuessInput makeGuess={makeGuess} />
    </div>
  );
}
