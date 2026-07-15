import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./paths";
import RouteProtegee from "./RouteProtegee";

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
        {/* --- Espace public --- */}
        {/* Redirection temporaire tant que l'écran 1 (Accueil) n'est pas codé */}
        <Route path={ROUTES.accueil} element={<AccueilPage />} />        
        {/* <Route path={ROUTES.recherche} element={<ArchivePage />} /> */}
        {/* <Route path="/memoires/:id" element={<DetailMemoirePage />} /> */}

        {/* --- Espace étudiant / admin (auth) --- */}
        <Route path={ROUTES.inscription} element={<InscriptionPage />} />
        <Route path={ROUTES.activation} element={<ActivationPage />} />
        <Route path={ROUTES.motDePasseOublie} element={<MotDePasseOubliePage />} />

        {/* Connexion scindée en 2 pages séparées (sécurité) : étudiant et admin */}
        <Route path={ROUTES.connexionEtudiant} element={<ConnexionEtudiantPage />} />
        <Route path={ROUTES.connexionAdmin} element={<ConnexionAdminPage />} />

        {/* --- Espace étudiant --- */}
        <Route
          path={ROUTES.espaceEtudiant}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DashboardEtudiantPage />
            </RouteProtegee>
          }
        />
        <Route
          path={ROUTES.profilEtudiant}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <ProfilEtudiantPage />
            </RouteProtegee>
          }
        />
        <Route
          path={ROUTES.depotEtudiant}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DepotMemoirePage />
            </RouteProtegee>
          }
        />
        <Route
          path={ROUTES.depotEtudiantModifier(":id")}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DepotMemoirePage />
            </RouteProtegee>
          }
        />
        {/* <Route path={ROUTES.memoireDetailEtudiant(":id")} element={<DetailDepotPage />} /> */}

        {/* --- Espace admin --- */}
        <Route
          path={ROUTES.espaceAdmin}
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <DashboardAdminPage />
            </RouteProtegee>
          }
        />
        {/* <Route path="/admin/en-attente" element={<DepotsEnAttentePage />} /> */}
        {/* <Route path="/admin/en-attente/:id" element={<ExaminerDepotPage />} /> */}
        <Route
          path={ROUTES.etudiantsAutorisesAdmin}
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <EtudiantsAutorisesPage />
            </RouteProtegee>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}