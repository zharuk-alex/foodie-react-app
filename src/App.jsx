import "@fontsource/mulish";
import "@fontsource/mulish/500.css";
import "@fontsource/mulish/700.css";
import "@fontsource/mulish/800.css";
import Layout from "components/AppLayout/AppLayout";
import routes from "./routes.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { AppLoader } from "components/UI";

const AppLayout = () => (
  <Layout>
    <Suspense fallback={<AppLoader visible={true} />}>
      <Outlet />
    </Suspense>
  </Layout>
);

const App = () => {
  const AppRouter = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [...routes],
    },
  ]);

  return (
    <RouterProvider
      router={AppRouter}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  );
};

export default App;
