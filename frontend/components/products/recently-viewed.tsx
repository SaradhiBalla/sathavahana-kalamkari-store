"use client";

import { useEffect } from "react";
import { apiRequest } from "../../lib/api/client";
import { useAuth } from "../auth/auth-provider";

export function RecentlyViewed({ productId }: { productId: number }) {
  const { user } = useAuth();
  useEffect(() => {
    if (user) apiRequest(`/products/${productId}/view`, { method: "POST" }).catch(() => {});
    else {
      const key = "sathavahana_recently_viewed";
      const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as number[];
      window.localStorage.setItem(key, JSON.stringify([productId, ...current.filter(id => id !== productId)].slice(0, 12)));
    }
  }, [productId, user]);
  return null;
}
