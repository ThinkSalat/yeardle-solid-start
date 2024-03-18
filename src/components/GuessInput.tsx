import { createEffect, createSignal } from "solid-js"
import { Game } from "~/models"

export default function GuessInput({ makeGuess }: { makeGuess: (number: number) => void }) {
  const [currentGuess, setCurrentGuess] = createSignal('')
  let input;


  const onKeyPress = (event: KeyboardEvent) => {
    event.preventDefault();

    const key = event.key;
    const currentInput = currentGuess();

    if (key === '-') {
      setCurrentGuess(currentInput.startsWith('-') ? currentInput.slice(1) : `-${currentInput}`);
      input.value = currentInput.startsWith('-') ? currentInput.slice(1) : `-${currentInput}`
    } else if (/[0-9]/.test(key)) {
      const newValue = `${currentInput}${key}`;

      // Limit to four digits
      if (newValue.replace('-', '').length <= 4) {
        setCurrentGuess(newValue);
        input.value = newValue
      }
    } else if (key === 'Enter') {
      event.preventDefault();

      makeGuess(Number(currentInput))
      setCurrentGuess('')
      input.value = ''
    } else if (key === 'Backspace') {
      const newGuess = currentInput.slice(0, currentInput.length - 1)
      setCurrentGuess(newGuess)
      input.value = newGuess
    }
  };



  return (
    <div>
      <div>Enter your guess below:</div>

      <input ref={input} style={{ border: '1px solid black', "border-radius": '5px' }} type="numeric" name="guess" value={currentGuess()} onKeyDown={onKeyPress} />

    </div>
  )
}