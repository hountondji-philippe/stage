import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./paths";
import RouteProtegee from "./RouteProtegee";

// Layouts
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
import ProfilEtudiantPage from "../features/etudiant/pages/ProfilEtudiantPage";
import DepotMemoirePage from "../features/memoires/pages/DepotMemoirePage";
import AccueilPage from "../features/accueil/pages/AccueilPage";

 export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Espace AVEC Header et Footer --- */}
        {/* Uniquement pour l'Accueil (et écran 2/3 si besoin) */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.accueil} element={<AccueilPage />} />
          {/* Ajoute ici les routes écran 2 et 3 si tu veux qu'elles aient le header */}
        </Route>

        {/* --- Espace SANS Header et Footer --- */}
        {/* Routes directes sans layout */}
        
        <Route path={ROUTES.inscription} element={<InscriptionPage />} />
        <Route path={ROUTES.activation} element={<ActivationPage />} />
        <Route path={ROUTES.motDePasseOublie} element={<MotDePasseOubliePage />} />
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
<Route
  path={ROUTES.etudiantsAutorisesAdmin}
  element={
    <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
      <EtudiantsAutorisesPage />
    </RouteProtegee>
  }
/>

<Route path="*" element={<div className="p-10 text-center">Page introuvable (404)</div>} />
        <Route
          path={ROUTES.espaceEtudiant}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DashboardEtudiantPage />
            </RouteProtegee>
          }
        />
        {/* ... Autres routes sans header ... */}
      </Routes>
    </BrowserRouter>
  );
}