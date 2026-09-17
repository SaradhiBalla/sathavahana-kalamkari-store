"use client";

import { ProtectedPage } from "../../../components/account/protected-page";

export default function OrdersPage() {
  return <ProtectedPage><main className="container section"><span className="eyebrow">ORDERS</span><h1>Your orders</h1><p className="muted">You haven't placed any orders yet.</p></main></ProtectedPage>;
}
