import { YEAR_RANGES } from "~/constants";
import { YearRange } from "~/models";

export default function GuessResult({ guess, range }: { guess: number; range: YearRange; }) {

  const resultIndex = YEAR_RANGES.findIndex(el => el.low === range.low)
  console.log({resultIndex})
  return (
    <li class={`bg-gr-${resultIndex} w-2/4 p-4 rounded text-rose-of-sharon-100`} >
      <div>{guess}</div>
      <div>{range.toString()}</div>
    </li>
  );
}
