import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <div class="bg-rose-of-sharon-200 text-2xl text-rose-of-sharon-950 w-screen h-screen">
          <Nav />
          <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
