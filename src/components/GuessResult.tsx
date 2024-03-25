import { YEAR_RANGES } from "~/constants";
import { YearRange } from "~/models";

export default function GuessResult({ guess, range }: { guess: number; range: YearRange; }) {

  const resultIndex = YEAR_RANGES.findIndex(el => el.low === range.low)

  return (
    <li class={`bg-gr-${resultIndex} p-1 rounded text-rose-of-sharon-100`} >
      <div>{guess}</div>
      <div class="text-xl pb-1">{range.toString()}</div>
      <div class="text-xl pb-1">Possible ranges:</div>
      <div class="text-xl pb-1">{guess - range.high} - {guess - range.low}</div>
      <div class="text-xl pb-1">{guess + range.low} - {guess + range.high}</div>
    </li>
  );
}
