"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="container section" role="alert"><h1>We are temporarily unavailable</h1><p>Please try again.</p><button className="button" onClick={() => reset()}>Try again</button></main></body></html>;
}
