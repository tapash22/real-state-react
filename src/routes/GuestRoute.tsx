import { Navigate, Outlet } from "react-router-dom";

import { useCurrentUser } from "../hooks/useCurrentUser";

export const GuestRoute = () => {
  const { data: user, isPending } = useCurrentUser();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
