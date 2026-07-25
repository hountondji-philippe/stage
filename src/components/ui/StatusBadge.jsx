const STATUS_STYLES = {
  actif: { label: "Actif", className: "bg-green-100 text-green-700" },
  non_active: { label: "Non activé", className: "bg-gray-100 text-gray-600" },

  en_attente: { label: "En attente", className: "bg-orange-100 text-orange-700" },
  en_attente_binome: { label: "En attente du binôme", className: "bg-purple-100 text-purple-700" },
  valide: { label: "Validé", className: "bg-green-100 text-green-700" },
  rejete: { label: "Rejeté", className: "bg-red-100 text-red-700" },
};

export default function StatusBadge({ status, className = "" }) {
  const config = STATUS_STYLES[status] || {
    label: status,
    className: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}