"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../auth/auth-provider";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname ?? "/account")}`);
  }, [loading, user, pathname, router]);
  if (loading || !user) return <main className="container section"><p>Loading your account...</p></main>;
  return <>{children}</>;
}
