import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RecipePage = lazy(() => import("./pages/RecipePage/RecipePage"));
const RecipeDetailPage = lazy(() => import("./pages/RecipeDetailPage/RecipeDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const AddRecipePage = lazy(() => import("./pages/AddRecipePage/AddRecipePage"));

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
    path: "/recipe/:id", //
    element: <RecipeDetailPage />,
    handle: { routeName: "recipe_detail" },
  },
  {
    path: "/recipe/add",
    element: <AddRecipePage />,
    title: "Add Recipe",
    isNav: true,
    handle: { routeName: "add_recipe" },
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
