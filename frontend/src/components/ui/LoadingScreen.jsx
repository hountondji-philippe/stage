import { GraduationCap } from "lucide-react";

/**
 * Overlay de chargement — flou l'arrière-plan (la page reste visible
 * dessous) et affiche une carte centrée (logo + spinner + message).
 *
 * ⚠️ Ne remplace PAS le contenu de la page : à utiliser EN PLUS du
 * contenu normal, pas à la place. Exemple :
 *
 *   return (
 *     <div className="relative">
 *       {loading && <LoadingScreen message="Chargement..." />}
 *       <main>...contenu normal de la page...</main>
 *     </div>
 *   );
 *
 * fullScreen=true (défaut) : recouvre tout l'écran (fixed inset-0).
 * fullScreen=false : recouvre seulement le conteneur parent le plus
 * proche en position relative/absolute (utile pour flouter juste une
 * section précise, ex: un tableau qui recharge).
 */
export default function LoadingScreen({ fullScreen = true, message = "Chargement..." }) {
  return (
    <div
      className={`z-50 flex items-center justify-center bg-white/40 ${
        fullScreen ? "fixed inset-0" : "absolute inset-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-xl">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)]/15" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[var(--color-primary)]" />
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)]">
            <GraduationCap size={20} className="text-white" />
          </div>
        </div>

        <span className="text-xl font-black tracking-tight text-[var(--color-primary)]">
          MÉMOIRES<span className="text-[var(--color-accent)]">+</span>
        </span>

        {message && <p className="text-sm font-medium text-gray-500">{message}</p>}
      </div>
    </div>
  );
}