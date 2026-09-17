"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../auth/auth-provider";
import { useEffect } from "react";

const items = [
  ["/admin/dashboard", "Dashboard", "DASHBOARD_VIEW"],
  ["/admin/products", "Products", "PRODUCT_VIEW"],
  ["/admin/categories", "Categories", "CATEGORY_VIEW"],
  ["/admin/inventory", "Inventory", "INVENTORY_VIEW"],
  ["/admin/orders", "Orders", "ORDER_VIEW"],
  ["/admin/customers", "Customers", "CUSTOMER_VIEW"],
  ["/admin/reports", "Reports", "REPORT_VIEW"],
  ["/admin/audit-logs", "Audit logs", "AUDIT_VIEW"],
  ["/admin/settings", "Settings", "SETTINGS_VIEW"]
] as const;

export function canAccess(user: { role?: string; permissions?: string[] } | null, permission: string) {
  return Boolean(user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN" || user.permissions?.includes(permission)));
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname() ?? "";
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!user || !["ADMIN", "SUPER_ADMIN", "CATALOG_MANAGER", "ORDER_MANAGER"].includes(user.role))) router.replace("/login?redirect=/admin/dashboard");
  }, [loading, user, router]);
  if (loading || !user) return <main className="container section"><p>Checking administrator access...</p></main>;
  const visible = items.filter(([, , permission]) => canAccess(user, permission));
  return <div className="admin-layout">
    <aside className="admin-sidebar">
      <Link href="/admin/dashboard" className="brand">SATHAVAHANA<small>ADMINISTRATION</small></Link>
      <nav aria-label="Admin navigation">{visible.map(([href, label]) => <Link className={pathname.startsWith(href) ? "active" : ""} href={href} key={href}>{label}</Link>)}</nav>
      <button className="text-button" onClick={async () => { await signOut(); router.push("/"); }}>Sign out</button>
    </aside>
    <section className="admin-content"><header className="admin-header"><span className="eyebrow">OPERATIONS</span><strong>{user.name}</strong></header>{children}</section>
  </div>;
}
