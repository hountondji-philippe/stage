export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  leftIcon,
  rightElement,
  autoComplete,
  inputClassName = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-[var(--color-text)]"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 group-focus-within:text-[var(--color-primary-light)] transition-colors">
            {leftIcon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className={`
            w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none
            transition-colors bg-white text-[var(--color-text)]
            focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/15
            ${error ? "border-red-500" : "border-gray-300"}
            ${leftIcon ? "pl-11" : ""}
            ${rightElement ? "pr-10" : ""}
            ${inputClassName}
          `}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}