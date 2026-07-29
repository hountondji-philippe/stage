import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getMe, logout as logoutRequest } from "../api/authApi";
import { ROUTES } from "../../../router/paths";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lectureSeule, setLectureSeule] = useState(false);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("mplus_token");
    const estLectureSeule = localStorage.getItem("mplus_lecture_seule") === "true";

    if (!token) {
      setUser(null);
      setLectureSeule(false);
      setLoading(false);
      return;
    }

    // Session L2 en lecture seule : le token pointe vers un modèle AccesL2,
    // pas un User — appeler /auth/me planterait ou renverrait n'importe quoi.
    if (estLectureSeule) {
  try {
    await verifierAccesL2();
    setUser(null);
    setLectureSeule(true);
  } catch {
    localStorage.removeItem("mplus_token");
    localStorage.removeItem("mplus_lecture_seule");
    setUser(null);
    setLectureSeule(false);
  }
  setLoading(false);
  return;
}

    try {
      const { user } = await getMe();
      setUser(user);
      setLectureSeule(false);
    } catch {
      setUser(null);
      setLectureSeule(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  async function logout() {
    const estLectureSeule = localStorage.getItem("mplus_lecture_seule") === "true";
    try {
      // Un accès L2 en lecture seule n'a pas de session Sanctum "classique"
      // à révoquer via /auth/logout (le endpoint attend un User) — on se
      // contente de nettoyer le stockage local dans ce cas.
      if (!estLectureSeule) {
        await logoutRequest();
      }
    } finally {
      localStorage.removeItem("mplus_token");
      localStorage.removeItem("mplus_lecture_seule");
      setUser(null);
      setLectureSeule(false);
      window.location.href = ROUTES.connexionEtudiant;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, lectureSeule, logout, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}