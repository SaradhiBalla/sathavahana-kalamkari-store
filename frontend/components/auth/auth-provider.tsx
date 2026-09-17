"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../lib/api/client";
import type { CurrentUser } from "../../lib/auth";

type AuthContextValue = {
  user: CurrentUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const current = await apiRequest<CurrentUser>("/users/me");
      try {
        current.permissions = await apiRequest<string[]>("/users/me/permissions");
      } catch {
        current.permissions = [];
      }
      setUser(current);
    } catch {
      setUser(null);
    }
  }

  async function signOut() {
    await apiRequest("/auth/logout", { method: "POST" });
    setUser(null);
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
    const listener = () => { refresh(); };
    window.addEventListener("kalamkari-auth-changed", listener);
    return () => window.removeEventListener("kalamkari-auth-changed", listener);
  }, []);
  const value = useMemo(() => ({ user, loading, refresh, signOut }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
