"use client";

import Link from "next/link";
import { useAuth } from "../auth/auth-provider";
import { NotificationBell } from "../notifications/notification-bell";

export function AuthNav() {
  const { user, loading, signOut } = useAuth();
  if (loading) return <span aria-live="polite">...</span>;
  if (!user) {
    return <><Link href="/login">Login</Link><Link href="/register">Register</Link></>;
  }

  return <><Link href="/account">Account</Link><NotificationBell /><button className="nav-button" type="button" onClick={() => signOut()}>Logout</button></>;
}
