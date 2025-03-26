import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RecipePage = lazy(() => import("./pages/RecipePage/RecipePage"));
const UserPage = lazy(() => import("./pages/UserPage/UserPage"));
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
    path: "/user/:id",
    element: <UserPage />,
    title: "User page",
    isNav: true,
    handle: { routeName: "user_page" },
  },
  {
    path: "*",
    element: <NotFoundPage />,
    handle: { routeName: "not_found" },
  },
];

const ComponentsPage =
  process.env.NODE_ENV === "development"
    ? lazy(() => import("./pages/ComponentsPage/ComponentsPage"))
    : null;

if (ComponentsPage) {
  routes.push({ path: "/components", element: <ComponentsPage /> });
}

export default routes;
