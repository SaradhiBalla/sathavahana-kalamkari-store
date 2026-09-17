"use client";

import { ProtectedPage } from "../../../components/account/protected-page";
import { useAuth } from "../../../components/auth/auth-provider";

export default function ProfilePage() {
  const { user } = useAuth();
  return <ProtectedPage><main className="container section"><span className="eyebrow">PROFILE</span><h1>Your profile</h1><p><strong>Name:</strong> {user?.name}</p><p><strong>Email:</strong> {user?.email}</p><p><strong>Phone:</strong> {user?.phone || "Not added"}</p><p><strong>Role:</strong> {user?.role}</p></main></ProtectedPage>;
}
