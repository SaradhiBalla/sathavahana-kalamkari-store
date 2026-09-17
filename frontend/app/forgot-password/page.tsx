import Link from "next/link";
export const metadata = { title: "Forgot password", robots: { index: false, follow: false } };
export default function ForgotPasswordPage() { return <main className="container section auth-card"><span className="eyebrow">ACCOUNT ACCESS</span><h1>Forgot password?</h1><p>Password recovery is not available yet. Please contact the House directly for assistance.</p><Link className="button" href="/login">Return to login</Link></main>; }
