import { BrowserRouter, Routes, Route } from "react-router-dom";

// Les pages seront ajoutées une par une, écran par écran.
// On commence par l'écran 6 : Connexion.
import ConnexionPage from "../features/auth/pages/ConnexionPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Espace public --- */}
        {/* <Route path="/" element={<AccueilPage />} /> */}
        {/* <Route path="/archive" element={<ArchivePage />} /> */}
        {/* <Route path="/memoires/:id" element={<DetailMemoirePage />} /> */}

        {/* --- Espace étudiant / admin (auth) --- */}
        {/* <Route path="/inscription" element={<InscriptionPage />} /> */}
        {/* <Route path="/activation" element={<ActivationPage />} /> */}
        <Route path="/connexion" element={<ConnexionPage />} />

        {/* --- Espace étudiant --- */}
        {/* <Route path="/etudiant/tableau-de-bord" element={<DashboardEtudiantPage />} /> */}
        {/* <Route path="/etudiant/deposer" element={<DepotPage />} /> */}
        {/* <Route path="/etudiant/depots/:id" element={<DetailDepotPage />} /> */}

        {/* --- Espace admin --- */}
        {/* <Route path="/admin/tableau-de-bord" element={<DashboardAdminPage />} /> */}
        {/* <Route path="/admin/en-attente" element={<DepotsEnAttentePage />} /> */}
        {/* <Route path="/admin/en-attente/:id" element={<ExaminerDepotPage />} /> */}
        {/* <Route path="/admin/etudiants-autorises" element={<EtudiantsAutorisesPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
