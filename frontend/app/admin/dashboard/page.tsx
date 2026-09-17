"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../lib/api/client";
import { DataTable, StatusBadge } from "../../../components/admin/data-table";

type Dashboard = { totalRevenue?: number; totalOrders?: number; totalCustomers?: number; totalProducts?: number; pendingOrders?: number; lowStockProducts?: number; outOfStockProducts?: number; averageOrderValue?: number; recentOrders?: Array<Record<string, string | number>>; lowStock?: Array<Record<string, string | number>> };
export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null); const [error, setError] = useState("");
  useEffect(() => { apiRequest<Dashboard>("/admin/dashboard").then(setData).catch(e => setError(e.message)); }, []);
  if (error) return <main className="section"><p className="error">{error}</p></main>;
  if (!data) return <main className="section"><p>Loading dashboard...</p></main>;
  const cards = [["Revenue", `₹${(data.totalRevenue ?? 0).toLocaleString()}`], ["Orders", data.totalOrders ?? 0], ["Customers", data.totalCustomers ?? 0], ["Products", data.totalProducts ?? 0], ["Pending orders", data.pendingOrders ?? 0], ["Low stock", data.lowStockProducts ?? 0], ["Out of stock", data.outOfStockProducts ?? 0], ["Average order", `₹${(data.averageOrderValue ?? 0).toLocaleString()}`]];
  return <main className="section"><span className="eyebrow">ADMIN DASHBOARD</span><h1>Business overview</h1><div className="metric-grid">{cards.map(([label, value]) => <article className="metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}</div><div className="admin-grid"><section><h2>Recent orders</h2><DataTable><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>{(data.recentOrders ?? []).map((o, i) => <tr key={i}><td>{String(o.orderNumber ?? o.id ?? "-")}</td><td>{String(o.customer ?? o.customerName ?? "-")}</td><td>₹{String(o.total ?? 0)}</td><td><StatusBadge value={String(o.status ?? "UNKNOWN")} /></td></tr>)}</tbody></DataTable></section><section><h2>Low stock</h2><DataTable><thead><tr><th>Product</th><th>Stock</th><th>Threshold</th></tr></thead><tbody>{(data.lowStock ?? []).map((p, i) => <tr key={i}><td>{String(p.name ?? "-")}</td><td>{String(p.stock ?? p.stockQuantity ?? 0)}</td><td>{String(p.threshold ?? "-")}</td></tr>)}</tbody></DataTable></section></div></main>;
}
