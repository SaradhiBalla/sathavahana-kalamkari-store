export function DataTable({ children }: { children: React.ReactNode }) {
  return <div className="admin-table-wrap"><table className="admin-table">{children}</table></div>;
}
export function StatusBadge({ value }: { value: string }) {
  return <span className={`status-badge status-${value.toLowerCase().replaceAll("_", "-")}`}>{value.replaceAll("_", " ")}</span>;
}
