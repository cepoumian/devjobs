import { createRootRoute, Outlet /*, Link */ } from "@tanstack/react-router";
import BaseLayout from "../components/layout/BaseLayout";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
