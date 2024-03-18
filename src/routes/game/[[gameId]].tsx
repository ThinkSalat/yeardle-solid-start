import { useParams, useNavigate } from "@solidjs/router";
import { For, Show, createSignal } from "solid-js";
import { Game, YearRange, GameResult } from "~/models";
import { GameTimeline,GuessInput, GuessResult, TriviaItem } from "~/components";

export default function GameContainer() {
  let { gameId } = useParams()
  const game = gameId ? new Game(gameId) : Game.createRandomGame()
  const navigate = useNavigate()

  if (!gameId) {
    navigate(`/game/${game.gameId}`)
  }
  const [guesses, setGuesses] = createSignal<[number, YearRange][]>([])
  const [result, setResult] = createSignal<GameResult | null>(null)
  const [isGameOver, setIsGameOver] = createSignal(false)

  const makeGuess = (guess: number) => {
    const range = game.makeGuess(guess)
    // if win, do something here
    setGuesses(arr => [...arr, [guess, range]])
    if (range.low === 0 || game.getNumGuessesLeft() === 0) {
      setIsGameOver(true)
      setResult(game.endGame())
    }
  }

  return (
    <div class="text-center mx-auto">

      {/* Trivia items */}
      <ul>
        <For each={game.trivia.triviaItems}>
          {triviaItem => <TriviaItem text={triviaItem} />}
        </For>
      </ul>

      {/* Timeline */}
      <GameTimeline guesses={guesses} />

      {/* Results */}
      <ul style={{ display: 'flex', "flex-wrap": 'wrap' }}>
        <For each={guesses()}>
          {([guess, range]) => <GuessResult guess={guess} range={range} />}
        </For>
      </ul>

      {/* Game over screen */}
      <Show
        when={isGameOver()}
        fallback={<GuessInput makeGuess={makeGuess} />}
      >
        <div>{result()?.won ? "YOU WON" : "You lost"}</div>

        <div>Number Guesses: {String(result()?.guesses.length)}</div>
      </Show>

    </div>
  );
}
