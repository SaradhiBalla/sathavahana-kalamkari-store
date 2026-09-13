"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency, products } from "../../lib/products";

type CartLine = { productId: number; quantity: number };

export function CartClient() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("sathavahana_cart");
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  function persist(nextCart: CartLine[]) {
    setCart(nextCart);
    window.localStorage.setItem("sathavahana_cart", JSON.stringify(nextCart));
  }

  const lines = cart
    .map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) }))
    .filter((line): line is CartLine & { product: (typeof products)[number] } => Boolean(line.product));
  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  if (!loaded) return <main className="container section"><p className="muted">Loading your cart…</p></main>;
  if (!lines.length) {
    return <main className="container section"><span className="eyebrow">YOUR COLLECTION</span><h1>Your cart is empty</h1><p className="muted">Choose a handcrafted piece to begin your collection.</p><Link className="button" href="/products">Explore the collection</Link></main>;
  }

  return (
    <main className="container section">
      <span className="eyebrow">YOUR COLLECTION</span>
      <h1>Shopping cart</h1>
      <div className="cart-list">
        {lines.map(({ product, quantity }) => (
          <article className="cart-line" key={product.id}>
            <div className={`product-art ${product.artClass}`}>{product.artLabel}</div>
            <div><h2>{product.name}</h2><p className="muted">{formatCurrency(product.price)} each</p><label>Quantity <input aria-label={`Quantity for ${product.name}`} min="1" type="number" value={quantity} onChange={(event) => persist(cart.map((line) => line.productId === product.id ? { ...line, quantity: Math.max(1, Number(event.target.value)) } : line))} /></label><button className="text-button" type="button" onClick={() => persist(cart.filter((line) => line.productId !== product.id))}>Remove</button></div>
            <strong className="price">{formatCurrency(product.price * quantity)}</strong>
          </article>
        ))}
      </div>
      <div className="cart-summary"><strong>Total: {formatCurrency(total)}</strong><Link className="button" href="/checkout">Proceed to checkout</Link></div>
    </main>
  );
}
