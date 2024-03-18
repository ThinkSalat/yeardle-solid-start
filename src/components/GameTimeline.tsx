import { For, Accessor } from "solid-js";
import { YearRange } from "~/models";

export default function GameTimeline({ guesses }: { guesses: Accessor<[number, YearRange][]>; }) {
  const minRange = () => Math.min(...guesses().map(([year]) => year)) - 200;
  const maxRange = () => Math.max(...guesses().map(([year]) => year)) + 200;

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
