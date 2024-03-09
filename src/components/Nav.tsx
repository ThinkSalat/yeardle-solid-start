import { useLocation } from "@solidjs/router";
import { routes } from "~/constants";
import { A } from "@solidjs/router";


export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
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
