import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(current, last) {
  const pages = [];
  const showEllipsis = last > 5;

  if (!showEllipsis) {
    for (let i = 1; i <= last; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);

  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < last - 1) pages.push("...");

  pages.push(last);
  return pages;
}

export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null;

  const pages = getPageNumbers(meta.current_page, meta.last_page);

  return (
    <div className="mt-16 flex items-center justify-center gap-4">
      <button
        disabled={meta.current_page === 1}
        onClick={() => onPageChange(meta.current_page - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[var(--color-primary)] transition-colors hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="flex h-10 w-10 items-center justify-center text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={
                page === meta.current_page
                  ? "flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)] font-bold text-white"
                  : "flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-100"
              }
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        disabled={meta.current_page === meta.last_page}
        onClick={() => onPageChange(meta.current_page + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[var(--color-primary)] transition-colors hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}