"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import JSCookie from "js-cookie";
import { IUser } from "@/types/user.type";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, user: IUser) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize auth state from localStorage on mount
  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync across tabs via storage event
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }

      if (e.key === "accessToken" && !e.newValue) {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = React.useCallback((accessToken: string, userData: IUser) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    JSCookie.set("accessToken", accessToken, { expires: 7 });
    JSCookie.set("user", JSON.stringify(userData), { expires: 7 });

    setUser(userData);
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    JSCookie.remove("accessToken");
    JSCookie.remove("user");

    setUser(null);
    router.push("/login");
  }, [router]);

  const updateUser = React.useCallback((userData: IUser) => {
    localStorage.setItem("user", JSON.stringify(userData));
    JSCookie.set("user", JSON.stringify(userData), { expires: 7 });
    setUser(userData);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      updateUser,
    }),
    [user, isLoading, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
