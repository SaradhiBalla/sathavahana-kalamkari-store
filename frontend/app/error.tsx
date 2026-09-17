"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="container section" role="alert">
    <span className="eyebrow">SORRY</span>
    <h1>Something went wrong</h1>
    <p className="muted">We could not load this page. Your account and order data remain safe.</p>
    <button className="button" onClick={() => reset()}>Try again</button>
  </main>;
}
