import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useCurrentUser } from "../hooks/useCurrentUser";

export const ProtectedRoute = () => {
  const location = useLocation();

  const { data: user, isPending } = useCurrentUser();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/signin"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};
