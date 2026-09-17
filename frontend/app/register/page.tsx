"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiRequest } from "../../lib/api/client";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form, value: string) { setForm(current => ({ ...current, [field]: value })); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    const [firstName, ...lastName] = form.name.trim().split(/\s+/);
    if (!firstName) return setError("Full name is required.");
    setLoading(true);
    try {
      await apiRequest("/auth/register", { method: "POST", body: { email: form.email, password: form.password, firstName, lastName: lastName.join(" "), phone: form.phone } });
      router.push("/account");
      router.refresh();
    } catch {
      setError("We could not create your account. The email may already be registered.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="container section auth-shell">
    <div className="auth-art"><span className="eyebrow">JOIN THE HOUSE</span><h1>Create your account</h1><p>Save your details and make every future visit to our heritage collection more personal.</p></div>
    <div className="auth-card"><h2>Register</h2>
      <form className="checkout-form" onSubmit={submit}>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <label htmlFor="name">Full name<input id="name" autoComplete="name" required value={form.name} onChange={e => update("name", e.target.value)} /></label>
        <label htmlFor="email">Email<input id="email" type="email" autoComplete="email" required value={form.email} onChange={e => update("email", e.target.value)} /></label>
        <label htmlFor="phone">Phone<input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={e => update("phone", e.target.value)} /></label>
        <label htmlFor="password">Password<div className="password-row"><input id="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required value={form.password} onChange={e => update("password", e.target.value)} /><button className="password-toggle" type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></div></label>
        <label htmlFor="confirmPassword">Confirm password<input id="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" required value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} /></label>
        <button className="button" disabled={loading} type="submit">{loading ? "Creating account..." : "Create account"}</button>
      </form>
      <p className="muted">Already have an account? <Link href="/login">Login</Link></p>
    </div>
  </main>;
}
