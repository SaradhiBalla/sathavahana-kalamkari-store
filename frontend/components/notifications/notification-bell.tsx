"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api/client";

type Notice = { id: number; title: string; message: string; read: boolean };
export function NotificationBell() {
  const [items, setItems] = useState<Notice[]>([]);
  useEffect(() => { apiRequest<Notice[]>("/me/notifications").then(setItems).catch(() => setItems([])); }, []);
  const unread = items.filter(item => !item.read).length;
  return <Link href="/account/notifications" aria-label={`${unread} unread notifications`}>Notifications{unread > 0 ? ` (${unread})` : ""}</Link>;
}
