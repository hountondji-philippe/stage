import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function RouteProtegee({ children, rolesAutorises, redirectTo = "/connexion-etudiant" }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        Chargement...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (rolesAutorises && !rolesAutorises.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}