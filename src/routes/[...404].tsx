import { A } from "@solidjs/router";
import { routes } from "~/constants";

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Not Found</h1>
      <p class="my-4">
        <A href={routes.home} class="text-sky-600 hover:underline">
          Home
        </A>
        {" - "}
        <A href={routes.play} class="text-sky-600 hover:underline">
          Play
        </A>
        {" - "}
        <A href={routes.about} class="text-sky-600 hover:underline">
          About Page
        </A>
      </p>
    </main>
  );
}
