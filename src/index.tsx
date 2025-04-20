import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Fire } from "./screens/Fire";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Solid } from "./screens/Solid";
import { Landing } from "./screens/Landing";

let router = createBrowserRouter([
  {
    path: "/solid",
    Component: Solid,
  },
  {
    path: "/fire",
    Component: Fire,
  },
  {
    path: "/",
    Component: Landing,
  },
]);

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
