import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function RouteProtegee({
  children,
  rolesAutorises,
  redirectTo = "/connexion-etudiant",
  autoriserLectureSeule = false,
}) {
  const { user, lectureSeule, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        Chargement...
      </div>
    );
  }

  // Accès "lecture seule" (code L2) autorisé explicitement sur cette route
  if (autoriserLectureSeule && lectureSeule) {
    return children;
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (rolesAutorises && !rolesAutorises.includes(user.role)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}