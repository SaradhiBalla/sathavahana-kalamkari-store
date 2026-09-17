"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../../lib/api/client";
import { useAuth } from "../auth/auth-provider";
import { formatCurrency, products as catalog } from "../../lib/products";

type Line = { productId: number; quantity: number };
type ServerCart = { items?: Array<{ productId?: number; product?: { id: number; name?: string; price?: number }; quantity: number; unitPrice?: number; subtotal?: number }>; total?: number; subtotal?: number };

export function CartClient() {
  const { user, loading: authLoading } = useAuth();
  const [lines, setLines] = useState<Line[]>([]);
  const [serverCart, setServerCart] = useState<ServerCart | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const guestKey = "sathavahana_guest_cart";

  async function load() {
    try {
      if (user) setServerCart(await apiRequest<ServerCart>("/cart"));
      else {
        const stored = window.localStorage.getItem(guestKey);
        setLines(stored ? JSON.parse(stored) : []);
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load cart"); }
    finally { setLoaded(true); }
  }
  useEffect(() => { if (!authLoading) load(); }, [user, authLoading]);

  async function change(productId: number, quantity: number) {
    setError("");
    try {
      if (user) setServerCart(await apiRequest<ServerCart>(`/cart/items/${productId}`, { method: "PUT", body: { productId, quantity } }));
      else {
        const next = lines.map(line => line.productId === productId ? { ...line, quantity } : line);
        setLines(next); window.localStorage.setItem(guestKey, JSON.stringify(next));
      }
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to update cart"); }
  }
  async function remove(productId: number) {
    if (user) await apiRequest(`/cart/items/${productId}`, { method: "DELETE" });
    else { const next = lines.filter(line => line.productId !== productId); setLines(next); window.localStorage.setItem(guestKey, JSON.stringify(next)); }
    await load();
  }
  const displayLines = user ? (serverCart?.items ?? []).map(item => {
    const id = item.productId ?? item.product?.id ?? 0;
    const local = catalog.find(p => p.id === id);
    return { productId: id, quantity: item.quantity, name: item.product?.name ?? local?.name ?? `Product ${id}`, price: item.unitPrice ?? item.product?.price ?? local?.price ?? 0, artClass: local?.artClass ?? "", artLabel: local?.artLabel ?? "KALAMKARI", subtotal: item.subtotal ?? (item.unitPrice ?? local?.price ?? 0) * item.quantity };
  }) : lines.map(line => { const p = catalog.find(item => item.id === line.productId); return p ? { ...line, name: p.name, price: p.price, artClass: p.artClass, artLabel: p.artLabel, subtotal: p.price * line.quantity } : null; }).filter(Boolean) as Array<Line & { name: string; price: number; artClass: string; artLabel: string; subtotal: number }>;
  const total = user ? serverCart?.total ?? serverCart?.subtotal ?? displayLines.reduce((sum, line) => sum + line.subtotal, 0) : displayLines.reduce((sum, line) => sum + line.subtotal, 0);
  if (!loaded) return <main className="container section"><p className="muted">Loading your cart...</p></main>;
  if (!displayLines.length) return <main className="container section"><span className="eyebrow">YOUR COLLECTION</span><h1>Your cart is empty</h1><p className="muted">Choose a handcrafted piece to begin your collection.</p><Link className="button" href="/products">Explore the collection</Link></main>;
  return <main className="container section"><span className="eyebrow">YOUR COLLECTION</span><h1>Shopping cart</h1>{error && <p className="error">{error}</p>}<div className="cart-list">{displayLines.map(line => <article className="cart-line" key={line.productId}><div className={`product-art ${line.artClass}`}>{line.artLabel}</div><div><h2>{line.name}</h2><p className="muted">{formatCurrency(line.price)} each</p><label>Quantity <input aria-label={`Quantity for ${line.name}`} min="1" type="number" value={line.quantity} onChange={e => change(line.productId, Math.max(1, Number(e.target.value)))}/></label><button className="text-button" type="button" onClick={() => remove(line.productId)}>Remove</button></div><strong className="price">{formatCurrency(line.subtotal)}</strong></article>)}</div><div className="cart-summary"><strong>Total: {formatCurrency(total)}</strong><Link className="button" href="/checkout">Proceed to checkout</Link></div></main>;
}
