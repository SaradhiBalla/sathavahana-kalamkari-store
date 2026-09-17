"use client";

import { useEffect, useState } from "react";
import { ProtectedPage } from "../../../../components/account/protected-page";
import { apiRequest } from "../../../../lib/api/client";

export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  useEffect(() => { setPreferences({ orderUpdates: true, paymentUpdates: true, shippingUpdates: true, promotions: false, recommendations: false, abandonedCart: true, backInStock: true }); }, []);
  return <ProtectedPage><main className="container section"><span className="eyebrow">SETTINGS</span><h1>Notification preferences</h1><form className="checkout-form" onSubmit={async e => { e.preventDefault(); try { await Promise.all(Object.entries(preferences).map(([eventType, enabled]) => apiRequest("/me/notification-preferences", { method: "POST", body: { channel: "EMAIL", eventType: eventType.toUpperCase(), enabled } }))); setMessage("Preferences saved."); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to save preferences"); } }}>{Object.entries(preferences).map(([key, value]) => <label key={key}><span>{key.replace(/[A-Z]/g, letter => ` ${letter}`).replace(/^./, letter => letter.toUpperCase())}</span><input type="checkbox" checked={value} onChange={e => setPreferences({ ...preferences, [key]: e.target.checked })} /></label>)}<button className="button">Save preferences</button></form>{message && <p>{message}</p>}</main></ProtectedPage>;
}
