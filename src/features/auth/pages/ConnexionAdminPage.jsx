import BrandPanel from "../components/BrandPanel";
import ConnexionAdminForm from "../components/ConnexionAdminForm";

export default function ConnexionAdminPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
      {/* Desktop : panneau 45% dégradé uni, grand texte + logo.
          Mobile : ce même composant devient le fond plein écran (voir BrandPanel.jsx). */}
      <BrandPanel
        title="Gérez les dépôts, validez les mémoires et administrez les accès de la plateforme."
        linkText="Consulter les mémoires publiques"
        linkTo="/archive"
        badgeText="Espace administrateur"
      />

      {/* Formulaire — box-shadow pour bien ressortir du panneau de marque.
          Mobile : flotte en carte blanche par-dessus le fond (z-10).
          Desktop : panneau blanc plein, avec une ombre portée côté gauche (seam). */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6 md:bg-white md:px-12 md:shadow-[-30px_0_60px_-20px_rgba(0,14,77,0.35)]">
        <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8 md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
          <ConnexionAdminForm />
        </div>
      </div>
    </main>
  );
}