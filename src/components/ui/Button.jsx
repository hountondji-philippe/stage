const VARIANTS = {
  primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]",
  accent: "bg-[var(--color-accent)] text-[var(--color-text)] hover:brightness-95",
  outline:
    "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 bg-transparent",
  danger: "border border-red-600 text-red-600 hover:bg-red-50 bg-transparent",
};

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5
        font-semibold text-sm transition-colors
        disabled:opacity-60 disabled:cursor-not-allowed
        ${fullWidth ? "w-full" : ""}
        ${VARIANTS[variant]}
        ${className}
      `}
    >
      {loading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      )}
      {children}
    </button>
  );
}