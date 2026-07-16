// src/components/ui/PasswordField.jsx
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "./TextField";

export default function PasswordField({ label, name, value, onChange, error, required = false }) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      label={label}
      name={name}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      leftIcon={<Lock className="w-4 h-4" />}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-gray-400 hover:text-gray-600"
          tabIndex={-1}
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  );
}