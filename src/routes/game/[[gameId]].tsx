import { useParams, useNavigate, useLocation } from "@solidjs/router";
import { For, Show, createEffect, createSignal } from "solid-js";
import { Game, YearRange, GameResult } from "~/models";
import { GameTimeline, GuessInput, GuessResult, TriviaItem } from "~/components";
import { YEAR_RANGES } from "~/constants";

const Button = ({ ...props }) => {
  return (
    <button {...props} class={`m-2 bg-gr-0 hover:brightness-125 active:transform active:scale-95 text-rose-of-sharon-100 font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${props.class}`}>
      {props.children}
    </button>)

}

export default function GameContainer() {
  let { gameId } = useParams()
  const location = useLocation();
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search);
  const gameResult = searchParams.get('gameResult')

  const game = gameId ? new Game(gameId) : Game.createRandomGame()

  if (!gameId) {
    navigate('/')
    navigate(`/game/${game.gameId}`)
  }

  const [validNumbers, setValidNumbers] = createSignal(new Set())
  const [guesses, setGuesses] = createSignal<[number, YearRange][]>([])
  const [result, setResult] = createSignal<GameResult | null>(null)
  const [isGameOver, setIsGameOver] = createSignal(false)
  const [showAnswer, setShowAnswer] = createSignal(false)
  const [showSharedResults, setShowSharedResults] = createSignal(false)


  const makeGuess = (guess: number) => {
    const range = game.makeGuess(guess)
    // if win, do something here
    setGuesses(arr => [...arr, [guess, range]])
    if (range.low === 0 || game.getNumGuessesLeft() === 0) {
      setIsGameOver(true)
      setResult(game.endGame())
    }
  }

  // Every guess creates 2 possible ranges.
  // 
  createEffect(() => {
    guesses().forEach(([year, range]) => {

    })
  })

  const resetGame = () => {
    game.reset()
    setGuesses([])
    setIsGameOver(false)
    setResult(null)
    setShowAnswer(false)
  }

  const shareResult = () => {
    const encodedResult = result()!.encodeGameResult();
    console.log({ gameId, encodedResult, decoded: GameResult.decodeGameResult(encodedResult) })
    const shareURL = `http://localhost:3000/game/${gameId}?gameResult=${encodedResult}`

    // Notify and all that.
    navigator.clipboard.writeText(shareURL)
  }

  const startRandomGame = () => {
    navigate('/')
    navigate('/game')
  }

  const closestGuess = () => Math.min(...guesses().map(([_, range]) => {
    return YEAR_RANGES.findIndex(el => el.low === range.low)
  }))

  return (
    <div class="text-center mx-auto  max-w-5xl">

      {/* Trivia items */}
      <span class="mt-20 text-rose-of-sharon-950">In this year...</span>
      <ul class="text-left">
        <For each={game.trivia.triviaItems}>
          {triviaItem => <TriviaItem text={triviaItem} />}
        </For>
      </ul>

      {/* Timeline */}
      <GameTimeline guesses={guesses} />

      {/* Results */}
      <ul class="grid grid-cols-2 gap-4">
        <For each={guesses()}>
          {([guess, range]) => <GuessResult guess={guess} range={range} />}
        </For>
      </ul>

      {/* Game over screen */}
      {/* This will need its own components I think. */}
      <Show
        when={isGameOver()}
        fallback={<GuessInput makeGuess={makeGuess} />}
      >
        <div>{result()?.won ? "YOU WON" : "You lost"}</div>

        <div>Number Guesses: {String(result()?.guesses.length)}</div>
        <Show when={showAnswer()}>
          <div>{game.trivia.year}</div>
        </Show>
        <div>
          <Show
            when={!result()?.won && !showAnswer()}
          >
            <div class="flex justify-center">
              <Button class={`bg-gr-${closestGuess()}`} onClick={resetGame}>
                Try again?
              </Button>

              <Button class={`bg-gr-${closestGuess()}`} onClick={() => setShowAnswer(true)}>
                Show me the answer!
              </Button>
            </div>

          </Show>

          <Button class={`bg-gr-${closestGuess()}`} onClick={startRandomGame}>
            Play a random game
          </Button>
          <Button class={`bg-gr-${closestGuess()}`} onClick={shareResult}>
            Share
          </Button>

          <Show when={gameResult}>
            <Button class={`bg-gr-${closestGuess()}`} onClick={() => setShowSharedResults(true)}>
              Show results shared with you?
            </Button>

            <Show when={showSharedResults()}>
              <For each={ GameResult.decodeGameResult(gameResult!).guesses}>
                {(year) => <div>{year}</div>}
              </For>
              {/* If can get ranges from the guesses, can easily just display same way the game is displayed above */}
              {/* <GameTimeline guesses={ GameResult.decodeGameResult(gameResult!).guesses}/> */}
              Your opponent { GameResult.decodeGameResult(gameResult!).won ? 'WON' : 'LOST'}
            </Show>
          </Show>
        </div>
      </Show>
    </div>
  );
}
