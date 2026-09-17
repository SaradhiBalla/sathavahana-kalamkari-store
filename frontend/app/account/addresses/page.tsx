"use client";

import { ProtectedPage } from "../../../components/account/protected-page";

export default function AddressesPage() {
  return <ProtectedPage><main className="container section"><span className="eyebrow">DELIVERY</span><h1>Your addresses</h1><p className="muted">No saved addresses yet. Add one during checkout when address management is enabled.</p></main></ProtectedPage>;
}
