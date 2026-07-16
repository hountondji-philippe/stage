import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./paths";
import RouteProtegee from "./RouteProtegee";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";

// Pages
import EtudiantsAutorisesPage from "../features/admin/pages/EtudiantsAutorisesPage";
import DashboardAdminPage from "../features/admin/pages/DashboardAdminPage";
import InscriptionPage from "../features/auth/pages/InscriptionPage";
import ActivationPage from "../features/auth/pages/ActivationPage";
import MotDePasseOubliePage from "../features/auth/pages/MotDePasseOubliePage";
import ConnexionEtudiantPage from "../features/auth/pages/ConnexionEtudiantPage";
import ConnexionAdminPage from "../features/auth/pages/ConnexionAdminPage";
import DashboardEtudiantPage from "../features/memoires/pages/DashboardEtudiantPage";
import SearchPage from "../features/recherche/pages/SearchPage";
import AccueilPage from "../features/accueil/pages/AccueilPage";
import DepotsPage from "../features/admin/pages/DepotsPage";export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Espace AVEC Header et Footer --- */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.accueil} element={<AccueilPage />} />
          <Route path={ROUTES.archive} element={<SearchPage />} />
        </Route>

        {/* --- Espace SANS Header et Footer --- */}
        <Route path={ROUTES.inscription} element={<InscriptionPage />} />
<Route path="/activation/:token" element={<ActivationPage />} />        <Route path={ROUTES.motDePasseOublie} element={<MotDePasseOubliePage />} />
        <Route path={ROUTES.connexionEtudiant} element={<ConnexionEtudiantPage />} />
        <Route path={ROUTES.connexionAdmin} element={<ConnexionAdminPage />} />

        <Route
          path={ROUTES.espaceAdmin}
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <DashboardAdminPage />
            </RouteProtegee>
          }
        />
        <Route path="/admin/depots-en-attente" element={<DepotsPage />} />

        <Route
          path={ROUTES.espaceEtudiant}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DashboardEtudiantPage />
            </RouteProtegee>
          }
        />

        {/* Page 404 (doit toujours être en dernier) */}
        <Route path="*" element={<div className="p-10 text-center">Page introuvable (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
}