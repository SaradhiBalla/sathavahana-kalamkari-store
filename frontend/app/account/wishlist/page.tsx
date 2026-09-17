"use client";

import { ProtectedPage } from "../../../components/account/protected-page";

export default function WishlistPage() {
  return <ProtectedPage><main className="container section"><span className="eyebrow">WISHLIST</span><h1>Your wishlist</h1><p className="muted">Your wishlist is empty.</p></main></ProtectedPage>;
}
