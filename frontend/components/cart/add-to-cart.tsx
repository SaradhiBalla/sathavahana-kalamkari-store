"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api/client";
import { useAuth } from "../auth/auth-provider";

export function AddToCart({ productId }: { productId: number }) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  async function add() {
    try {
      if (user) await apiRequest("/cart/items", { method: "POST", body: { productId, quantity: 1 } });
      else {
        const key = "sathavahana_guest_cart";
        const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as Array<{ productId: number; quantity: number }>;
        const item = current.find(line => line.productId === productId);
        if (item) item.quantity += 1; else current.push({ productId, quantity: 1 });
        window.localStorage.setItem(key, JSON.stringify(current));
      }
      setMessage("Added to cart.");
    } catch (e) { setMessage(e instanceof Error ? e.message : "Unable to add item"); }
  }
  return <><button className="button" type="button" onClick={add}>Add to cart</button>{message && <p role="status">{message}</p>}</>;
}
