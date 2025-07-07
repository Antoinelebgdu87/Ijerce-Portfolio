import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/project";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configuration d'authentification sécurisée
const getAdminCredentials = () => {
  // En production, ces données viendraient d'un serveur sécurisé
  return {
    username: import.meta.env.VITE_ADMIN_USERNAME || "admin",
    password: import.meta.env.VITE_ADMIN_PASSWORD || "admin123",
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const storedUser = localStorage.getItem("admin_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("admin_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const credentials = getAdminCredentials();
    if (
      username === credentials.username &&
      password === credentials.password
    ) {
      const user: User = {
        username,
        isAuthenticated: true,
      };
      setUser(user);
      localStorage.setItem("admin_user", JSON.stringify(user));

      // Déclencher un événement de connexion admin pour informer les autres onglets
      window.dispatchEvent(
        new CustomEvent("adminLogin", { detail: { username } }),
      );

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");

    // Déclencher un événement de déconnexion admin
    window.dispatchEvent(new CustomEvent("adminLogout"));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
