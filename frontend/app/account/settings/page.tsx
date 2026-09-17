"use client";

import { ProtectedPage } from "../../../components/account/protected-page";

export default function SettingsPage() {
  return <ProtectedPage><main className="container section"><span className="eyebrow">SETTINGS</span><h1>Account settings</h1><p className="muted">Password and notification settings will appear here.</p></main></ProtectedPage>;
}
