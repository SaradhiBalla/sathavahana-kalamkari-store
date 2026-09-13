import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Sathavahana Kalamkari House", template: "%s | Sathavahana Kalamkari House" },
  description: "Heritage-inspired Kalamkari textiles, artwork and handcrafted creations.",
  openGraph: { title: "Sathavahana Kalamkari House", description: "Preserving tradition. Creating timeless art.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="announcement">Handcrafted Kalamkari • Rooted in Indian Heritage • Made with Care</div>
        <header className="header">
          <nav className="container nav" aria-label="Main navigation">
            <Link className="brand" href="/">SATHAVAHANA<small>KALAMKARI HOUSE</small></Link>
            <ul className="nav-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/products">Shop</Link></li>
              <li><Link href="/cart">Cart</Link></li>
            </ul>
          </nav>
        </header>
        {children}
        <footer className="footer"><div className="container muted">© {new Date().getFullYear()} Sathavahana Kalamkari House. All rights reserved.</div></footer>
      </body>
    </html>
  );
}
