import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getMe, logout as logoutRequest } from "../api/authApi";
import { ROUTES } from "../../../router/paths";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("mplus_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user } = await getMe();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function logout() {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem("mplus_token");
      setUser(null);
      window.location.href = ROUTES.connexionEtudiant;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
// ... ton code actuel ...

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}