import { apiRequest } from "./api/client";

export type CurrentUser = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  permissions?: string[];
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    return await apiRequest<CurrentUser>("/users/me");
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await apiRequest<void>("/auth/logout", { method: "POST" });
}
