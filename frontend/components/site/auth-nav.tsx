"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, type CurrentUser } from "../../lib/auth";

export function AuthNav() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then(setUser).finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  if (loading) return null;
  if (!user) {
    return <><Link href="/login">Login</Link><Link href="/register">Register</Link></>;
  }

  return <><Link href="/account">Account</Link><button className="nav-button" type="button" onClick={handleLogout}>Logout</button></>;
}
