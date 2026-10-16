import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useUser } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUser();

  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;