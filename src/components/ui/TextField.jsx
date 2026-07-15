export default function TextField({ label, icon: Icon, error, id, className = '', ...props }) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[#454651]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 w-5 h-5 text-[#767682] pointer-events-none" />}
        <input
          id={id}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-[#eff4ff] border rounded-lg outline-none transition-all
            focus:ring-2 focus:ring-[#3d56bb] focus:border-transparent
            ${error ? 'border-[#ba1a1a]' : 'border-[#c6c5d2]'}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#ba1a1a]">{error}</p>}
    </div>
  );
}
