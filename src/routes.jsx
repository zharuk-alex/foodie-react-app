import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RecipePage = lazy(() => import("./pages/RecipePage/RecipePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const routes = [
  {
    path: "/",
    element: <HomePage />,
    title: "Home",
    isNav: true,
    handle: { routeName: "home" },
  },
  {
    path: "/recipe",
    element: <RecipePage />,
    title: "Recipe page",
    isNav: true,
    handle: { routeName: "recipe_page" },
  },
  {
    path: "*",
    element: <NotFoundPage />,
    handle: { routeName: "not_found" },
  },
];

export default routes;
