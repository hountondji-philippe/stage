import EtudiantAuthVisual from "../components/EtudiantAuthVisual";
import ConnexionEtudiantForm from "../components/ConnexionEtudiantForm";

export default function ConnexionEtudiantPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
      {/* Desktop : panneau 45% avec image. Mobile : même composant en fond plein écran. */}
      <EtudiantAuthVisual />

      {/* Formulaire — sur mobile, flotte en carte au-dessus de l'image de fond */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6 md:bg-white md:px-12 md:py-0">
        <div className="w-full max-w-[440px] rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-md sm:p-8 md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          <ConnexionEtudiantForm />
        </div>
      </div>
    </main>
  );
}