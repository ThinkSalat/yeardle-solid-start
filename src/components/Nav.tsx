import { useLocation } from "@solidjs/router";
import { routes } from "~/constants";
import { A } from "@solidjs/router";


export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-rose-of-sharon-800" : "border-transparent hover:border-rose-of-sharon-800";
  return (
    <nav class="bg-rose-of-sharon-500 text-rose-of-sharon-950 shadow-lg border-rose-of-sharon-900 border-b-2">
      <ul class="container flex items-center p-3">
        <li class={`border-b-2 ${active(routes.home)} mx-1.5 sm:mx-6`}>
          <A href={routes.home}>Home</A>
        </li>
        <li class={`border-b-2 ${active(routes.play)} mx-1.5 sm:mx-6`}>
          <A href={routes.play}>Play</A>
        </li>
      </ul>
    </nav>
  );
}
