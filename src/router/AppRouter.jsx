import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./paths";
import RouteProtegee from "./RouteProtegee";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import ProfilEtudiantPage from "../features/etudiant/pages/ProfilEtudiantPage";
import DepotMemoirePage from "../features/memoires/pages/DepotMemoirePage";
import DetailDepotPage from "../features/memoires/pages/DetailDepotPage";
// Pages
import EtudiantsAutorisesPage from "../features/admin/pages/EtudiantsAutorisesPage";
import DashboardAdminPage from "../features/admin/pages/DashboardAdminPage";
import InscriptionPage from "../features/auth/pages/InscriptionPage";
import ActivationPage from "../features/auth/pages/ActivationPage";
import MotDePasseOubliePage from "../features/auth/pages/MotDePasseOubliePage";
import ReinitialiserMotDePassePage from "../features/auth/pages/ReinitialiserMotDePassePage";
import ConnexionEtudiantPage from "../features/auth/pages/ConnexionEtudiantPage";
import ConnexionAdminPage from "../features/auth/pages/ConnexionAdminPage";
import DashboardEtudiantPage from "../features/memoires/pages/DashboardEtudiantPage";
import SearchPage from "../features/recherche/pages/SearchPage";
import AccueilPage from "../features/accueil/pages/AccueilPage";
import DepotsPage from "../features/admin/pages/DepotsPage";
import DepotDetailPage from "../features/admin/pages/DepotDetailPage";
import ProfilAdminPage from "../features/admin/pages/ProfilAdminPage";
import MemoireDetailPage from "../features/recherche/pages/MemoireDetailPage";
import MemoiresListePage from "../features/admin/pages/MemoiresListePage";
import ListeFilierePage from "../features/admin/pages/ListeFilierePage";
import MesDepotsPage from "../features/memoires/pages/MesDepotsPage";
import AProposPage from "../features/accueil/pages/AProposPage";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Espace AVEC Header et Footer --- */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.accueil} element={<AccueilPage />} />
          <Route path="/memoires/:id" element={<MemoireDetailPage />} />
          <Route path={ROUTES.aPropos} element={<AProposPage />} />
          <Route path={ROUTES.activation(":token")} element={<ActivationPage />} />
         <Route path={ROUTES.motDePasseOublie} element={<MotDePasseOubliePage />} />
         <Route path="/reinitialiser-mot-de-passe/:token" element={<ReinitialiserMotDePassePage />} />
          <Route path={ROUTES.archive} element={<SearchPage />} />
        </Route>

        {/* --- Espace SANS Header et Footer --- */}
        <Route path={ROUTES.inscription} element={<InscriptionPage />} />
        <Route path="/activation/:token" element={<ActivationPage />} />
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
          path={ROUTES.mesDepots}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <MesDepotsPage />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/depots-en-attente"
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <DepotsPage />
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

        <Route
          path={ROUTES.espaceEtudiant}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DashboardEtudiantPage />
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
        <Route
          path={ROUTES.memoireDetailEtudiant(":id")}
          element={
            <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
              <DetailDepotPage />
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
          path={ROUTES.memoireDetailAdmin(":id")}
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <DepotDetailPage />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/memoires/ajouter"
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <DepotMemoirePage mode="admin" />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/filieres"
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <ListeFilierePage />
            </RouteProtegee>
          }
        />
        <Route
          path={ROUTES.memoiresListeAdmin}
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <MemoiresListePage />
            </RouteProtegee>
          }
        />
        <Route
          path="/admin/profil"
          element={
            <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
              <ProfilAdminPage />
            </RouteProtegee>
          }
        />

        {/* Page 404 (doit toujours être en dernier) */}
        <Route path="*" element={<div className="p-10 text-center">Page introuvable (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
}