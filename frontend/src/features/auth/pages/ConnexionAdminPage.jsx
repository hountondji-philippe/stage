import { GraduationCap } from "lucide-react";
import BrandPanel from "../components/BrandPanel";
import ConnexionAdminForm from "../components/ConnexionAdminForm";

export default function ConnexionAdminPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden md:flex-row">
      <BrandPanel
        title="Gérez les dépôts, validez les mémoires et administrez les accès de la plateforme."
        
        
        badgeText="Espace administrateur"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 md:flex-row md:bg-white md:px-12 md:shadow-[-30px_0_60px_-20px_rgba(0,14,77,0.35)]">
        {/* Logo — mobile uniquement, au-dessus du formulaire */}
        <div className="mb-6 flex items-center gap-2.5 text-white md:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg">
            <GraduationCap className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <span className="text-lg font-extrabold uppercase tracking-tight">MÉMOIRES+</span>
        </div>

        <div className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl sm:p-8 md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
          <ConnexionAdminForm />
        </div>
      </div>
    </main>
  );
}