"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest } from "../../lib/api/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("/auth/login", { method: "POST", body: { email, password } });
      window.dispatchEvent(new Event("kalamkari-auth-changed"));
      const redirect = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("redirect");
      router.push(safeRedirect(redirect) as Parameters<typeof router.push>[0]);
      router.refresh();
    } catch {
      setError("We could not sign you in. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="container section auth-shell">
    <div className="auth-art"><span className="eyebrow">YOUR ACCOUNT</span><h1>Welcome back</h1><p>Continue discovering handcrafted Kalamkari pieces made with care.</p></div>
    <div className="auth-card"><h2>Sign in</h2>
      <form className="checkout-form" onSubmit={submit}>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label htmlFor="password">Password<div className="password-row"><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /><button className="password-toggle" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div></label>
        <button className="button" disabled={loading} type="submit">{loading ? "Signing in..." : "Login"}</button>
      </form>
      <p className="muted">New to the House? <Link href="/register">Create an account</Link></p>
      <p className="muted"><Link href="/forgot-password">Forgot password?</Link></p>
    </div>
  </main>;
}

function safeRedirect(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/account";
}
