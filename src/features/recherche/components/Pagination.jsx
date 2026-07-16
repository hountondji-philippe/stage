function getPageNumbers(current, last) {
  const pages = [];
  const showEllipsis = last > 5;

  if (!showEllipsis) {
    for (let i = 1; i <= last; i++) pages.push(i);
    return pages;
  }

  // Toujours la première page
  pages.push(1);

  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);

  if (start > 2) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < last - 1) pages.push('...');

  // Toujours la dernière page
  pages.push(last);

  return pages;
}

export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null;

  const pages = getPageNumbers(meta.current_page, meta.last_page);

  return (
    <div className="flex justify-center items-center gap-4 mt-20">
      <button
        disabled={meta.current_page === 1}
        onClick={() => onPageChange(meta.current_page - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-primary hover:bg-surface-container transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <div className="flex gap-2">
        {pages.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={
                page === meta.current_page
                  ? 'w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold'
                  : 'w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors'
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
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-primary hover:bg-surface-container transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}