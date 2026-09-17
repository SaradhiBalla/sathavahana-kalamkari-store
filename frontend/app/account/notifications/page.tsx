"use client";

import { useEffect, useState } from "react";
import { ProtectedPage } from "../../../components/account/protected-page";
import { apiRequest } from "../../../lib/api/client";

type Notice = { id: number; title: string; message: string; read: boolean; createdAt?: string };
export default function NotificationsPage() {
  const [items, setItems] = useState<Notice[]>([]);
  useEffect(() => { apiRequest<Notice[]>("/me/notifications").then(setItems).catch(() => setItems([])); }, []);
  return <ProtectedPage><main className="container section"><span className="eyebrow">YOUR ACCOUNT</span><h1>Notifications</h1>{!items.length ? <p className="muted">You have no notifications.</p> : <div className="notification-list">{items.map(item => <article className={item.read ? "notification read" : "notification"} key={item.id}><strong>{item.title}</strong><p>{item.message}</p>{item.createdAt && <small className="muted">{new Date(item.createdAt).toLocaleString()}</small>} {!item.read && <button className="text-button" onClick={() => setItems(items.map(current => current.id === item.id ? { ...current, read: true } : current))}>Mark as read</button>}</article>)}</div>}</main></ProtectedPage>;
}
