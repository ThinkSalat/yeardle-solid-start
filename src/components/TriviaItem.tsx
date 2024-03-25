export default function TriviaItem({ text }: { text: string; }) {
  return (
    <li class="text-rose-of-sharon-950 text-xl mb-2"><span class="text-bold text-3xl">{text[0]}</span>{text.slice(1)}</li>
  );
}
