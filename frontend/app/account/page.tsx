"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, type CurrentUser } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  useEffect(() => { getCurrentUser().then(current => { if (!current) router.replace("/login?redirect=/account"); else setUser(current); }); }, [router]);
  if (!user) return <main className="container section"><p>Loading your account...</p></main>;
  return <main className="container section"><span className="eyebrow">YOUR ACCOUNT</span><h1>{user.name}</h1><p className="muted">{user.email}</p><p>Role: {user.role}</p><div className="account-links"><Link className="button" href="/products">Continue shopping</Link><Link className="button" href="/cart">Cart</Link><Link className="button" href="/checkout">Checkout</Link><button className="button" onClick={async () => { await logout(); router.push("/"); router.refresh(); }}>Logout</button></div></main>;
}
