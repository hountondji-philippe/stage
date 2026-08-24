import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./paths";
import RouteProtegee from "./RouteProtegee";
import LoadingScreen from "../components/ui/LoadingScreen";
import ActualitesPage from "../features/actualites/pages/ActualitesPage";
// Layouts (import normal — léger, toujours nécessaire)
import PublicLayout from "../components/layout/PublicLayout";
import ActualiteDetailPage from "../features/actualites/pages/ActualiteDetailPage";
// Pages (chargées à la demande)
const ProfilEtudiantPage = lazy(() => import("../features/etudiant/pages/ProfilEtudiantPage"));
const DepotMemoirePage = lazy(() => import("../features/memoires/pages/DepotMemoirePage"));
const DetailDepotPage = lazy(() => import("../features/memoires/pages/DetailDepotPage"));
const EtudiantsAutorisesPage = lazy(() => import("../features/admin/pages/EtudiantsAutorisesPage"));
const EtudiantDetailPage = lazy(() => import("../features/admin/pages/EtudiantDetailPage"));
const DashboardAdminPage = lazy(() => import("../features/admin/pages/DashboardAdminPage"));
const InscriptionPage = lazy(() => import("../features/auth/pages/InscriptionPage"));
const ActivationPage = lazy(() => import("../features/auth/pages/ActivationPage"));
const MotDePasseOubliePage = lazy(() => import("../features/auth/pages/MotDePasseOubliePage"));
const ReinitialiserMotDePassePage = lazy(() => import("../features/auth/pages/ReinitialiserMotDePassePage"));
const ConnexionEtudiantPage = lazy(() => import("../features/auth/pages/ConnexionEtudiantPage"));
const ConnexionAdminPage = lazy(() => import("../features/auth/pages/ConnexionAdminPage"));
const DashboardEtudiantPage = lazy(() => import("../features/memoires/pages/DashboardEtudiantPage"));
const SearchPage = lazy(() => import("../features/recherche/pages/SearchPage"));
const DepotsPage = lazy(() => import("../features/admin/pages/DepotsPage"));
const DepotDetailPage = lazy(() => import("../features/admin/pages/DepotDetailPage"));
const ProfilAdminPage = lazy(() => import("../features/admin/pages/ProfilAdminPage"));
const MemoireDetailPage = lazy(() => import("../features/recherche/pages/MemoireDetailPage"));
const MemoiresListePage = lazy(() => import("../features/admin/pages/MemoiresListePage"));
const ListeFilierePage = lazy(() => import("../features/admin/pages/ListeFilierePage"));
const FiliereDetailAdminPage = lazy(() => import("../features/admin/pages/FiliereDetailAdminPage"));
const MesDepotsPage = lazy(() => import("../features/memoires/pages/MesDepotsPage"));
const AProposPage = lazy(() => import("../features/accueil/pages/AProposPage"));
const ListeActualitesPage = lazy(() => import("../features/admin/pages/ListeActualitesPage"));
const MesTicketsPage = lazy(() => import("../features/support/pages/MesTicketsPage"));
const TicketsAdminPage = lazy(() => import("../features/support/pages/TicketsAdminPage"));
const ConfirmationBinomePage = lazy(() => import("../features/memoires/pages/ConfirmationBinomePage"));
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen message="Chargement..." />}>
       <Routes>
  {/* --- Espace AVEC Header et Footer --- */}
  <Route element={<PublicLayout />}>
    {/* Pages qui doivent rester accessibles sans connexion (flux d'authentification) */}
    <Route path={ROUTES.activation(":token")} element={<ActivationPage />} />
    <Route path={ROUTES.motDePasseOublie} element={<MotDePasseOubliePage />} />
    <Route path="/reinitialiser-mot-de-passe/:token" element={<ReinitialiserMotDePassePage />} />

    <Route
  path={ROUTES.archive}
  element={
    <RouteProtegee
      rolesAutorises={["etudiant", "admin"]}
      redirectTo={ROUTES.inscription}
      autoriserLectureSeule
    >
      <SearchPage />
    </RouteProtegee>
  }
/>
<Route
  path={ROUTES.actualites}
  element={
    <RouteProtegee rolesAutorises={["etudiant", "admin"]} redirectTo={ROUTES.inscription} autoriserLectureSeule>
      <ActualitesPage />
    </RouteProtegee>
  }
/>
<Route
  path={ROUTES.actualiteDetail(":id")}
  element={
    <RouteProtegee rolesAutorises={["etudiant", "admin"]} redirectTo={ROUTES.inscription} autoriserLectureSeule>
      <ActualiteDetailPage />
    </RouteProtegee>
  }
/>
<Route
  path="/memoires/:id"
  element={
    <RouteProtegee rolesAutorises={["etudiant", "admin"]} redirectTo={ROUTES.inscription} autoriserLectureSeule>
      <MemoireDetailPage />
    </RouteProtegee>
  }
/>
<Route
  path={ROUTES.aPropos}
  element={
    <RouteProtegee rolesAutorises={["etudiant", "admin"]} redirectTo={ROUTES.inscription} autoriserLectureSeule>
      <AProposPage />
    </RouteProtegee>
  }
/>
  </Route>

          {/* --- Espace SANS Header et Footer --- */}
          {/* La racine du site affiche directement le formulaire d'inscription */}
          <Route path={ROUTES.accueil} element={<InscriptionPage />} />
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
  path="/espace/confirmation-binome/:token"
  element={
    <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
      <ConfirmationBinomePage />
    </RouteProtegee>
  }
/>

          <Route
  path={ROUTES.mesTickets}
  element={
    <RouteProtegee rolesAutorises={["etudiant"]} redirectTo={ROUTES.connexionEtudiant}>
      <MesTicketsPage />
    </RouteProtegee>
  }
/>
          <Route
            path={ROUTES.etudiantDetailAdmin(":id")}
            element={
              <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
                <EtudiantDetailPage />
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
  path={ROUTES.ticketsAdmin}
  element={
    <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
      <TicketsAdminPage />
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
            path={ROUTES.filiereDetailAdmin(":id")}
            element={
              <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
                <FiliereDetailAdminPage />
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
          <Route
            path="/admin/actualites"
            element={
              <RouteProtegee rolesAutorises={["admin"]} redirectTo={ROUTES.connexionAdmin}>
                <ListeActualitesPage />
              </RouteProtegee>
            }
          />

          {/* Page 404 (doit toujours être en dernier) */}
          <Route path="*" element={<div className="p-10 text-center">Page introuvable (404)</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}