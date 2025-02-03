import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { signIn, signOut } = useAuthActions();
  useQuery(api.auth.currentUser);

  return (
    <>
      <h1>Minus minus</h1>
      <div>
        <Unauthenticated>
          <button onClick={() => void signIn("github")}>
            Sign in with GitHub
          </button>
        </Unauthenticated>
        <Authenticated>
          <Link to="/">Home</Link> <Link to="/loser-board">Loser Board</Link>
          <button onClick={() => void signOut()}>Sign out</button>
        </Authenticated>
      </div>
      <hr />
      <Authenticated>
        <Outlet />
      </Authenticated>
      <TanStackRouterDevtools />
    </>
  );
}
