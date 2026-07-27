import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Trash2, Eye, Mail } from "lucide-react";
import Button from "../../../components/ui/Button";
import StatusBadge from "../../../components/ui/StatusBadge";
import { apiClient } from "../../../lib/apiClient";

function nomAuteur(m) {
  const etudiant = m.user?.etudiantAutorise ?? m.user?.etudiant_autorise;
  return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : m.user?.email ?? "—";
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MemoiresListeCard({ m, onDeleteClick }) {
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [renvoiLoading, setRenvoiLoading] = useState(false);
  const [renvoiMessage, setRenvoiMessage] = useState(null); // { type: 'succes' | 'erreur', texte }
  const menuRef = useRef(null);
  const enAttente = m.statut === "en_attente";
  const estValide = m.statut === "valide";

  function handleVoirDetail() {
    navigate(`/admin/memoires/${m.id}`, { state: { memoire: m } });
  }

  useEffect(() => {
    if (!menuOuvert) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOuvert(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOuvert]);

  function handleConsulterDepuisMenu() {
    setMenuOuvert(false);
    handleVoirDetail();
  }

  function handleSupprimer() {
    setMenuOuvert(false);
    onDeleteClick(m);
  }

  async function handleRenvoyerFiche() {
    setRenvoiLoading(true);
    setRenvoiMessage(null);
    try {
      const { data } = await apiClient.post(`/admin/memoires/${m.id}/renvoyer-fiche`);
      setRenvoiMessage({ type: "succes", texte: data.message || "Fiche renvoyée par email." });
    } catch (err) {
      setRenvoiMessage({
        type: "erreur",
        texte: err.response?.data?.message || "Impossible de renvoyer la fiche.",
      });
    } finally {
      setRenvoiLoading(false);
      setTimeout(() => setMenuOuvert(false), 1200);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border-l-4 border-l-[var(--color-primary)] bg-white p-6 shadow-[0_4px_20px_rgba(19,36,107,0.06)] sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-3">
          <StatusBadge status={m.statut} />
          <span className="text-xs text-gray-400">Déposé le {formatDate(m.created_at)}</span>
        </div>

        <button
          onClick={handleVoirDetail}
          className="text-left text-lg font-bold text-[var(--color-primary)] hover:underline"
        >
          {m.titre}
        </button>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>{nomAuteur(m)}</span>
          {m.filiere?.nom && <span>• {m.filiere.nom}</span>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {enAttente ? (
          <Button variant="primary" onClick={handleVoirDetail}>
            Examiner
          </Button>
        ) : (
          <Button variant="outline" onClick={handleVoirDetail}>
            Consulter
          </Button>
        )}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOuvert((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50"
            aria-label="Plus d'options"
          >
            <MoreVertical size={18} />
          </button>
          {menuOuvert && (
            <div className="absolute right-0 top-12 z-10 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              <button
                onClick={handleConsulterDepuisMenu}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Eye size={16} />
                Consulter
              </button>

              {estValide && (
                <button
                  onClick={handleRenvoyerFiche}
                  disabled={renvoiLoading}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Mail size={16} />
                  {renvoiLoading ? "Envoi..." : "Renvoyer la fiche par email"}
                </button>
              )}

              <button
                onClick={handleSupprimer}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {renvoiMessage && (
        <p
          className={`w-full text-xs font-medium sm:w-auto ${
            renvoiMessage.type === "succes" ? "text-green-600" : "text-red-600"
          }`}
        >
          {renvoiMessage.texte}
        </p>
      )}
    </div>
  );
}