import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function PasswordField({ label, id, error, className = '', ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[#454651]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <Lock className="absolute left-3 w-5 h-5 text-[#767682] pointer-events-none" />
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`w-full pl-10 pr-11 py-3 bg-[#eff4ff] border rounded-lg outline-none transition-all
            focus:ring-2 focus:ring-[#3d56bb] focus:border-transparent
            ${error ? 'border-[#ba1a1a]' : 'border-[#c6c5d2]'}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 text-[#767682] hover:text-[#454651]"
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="text-xs text-[#ba1a1a]">{error}</p>}
    </div>
  );
}
