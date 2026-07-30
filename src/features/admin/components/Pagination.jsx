import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "dépôts",
}) {
  if (totalItems === 0) return null;

  const debut = (currentPage - 1) * pageSize + 1;
  const fin = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs font-medium text-gray-500">
        Affichage {debut}-{fin} sur {totalItems} {itemLabel}
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 w-9 shrink-0 rounded-lg text-sm font-bold transition-colors ${
              page === currentPage
                ? "bg-[var(--color-primary)] text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}