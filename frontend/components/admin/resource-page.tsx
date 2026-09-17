"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiRequest } from "../../lib/api/client";
import { DataTable, StatusBadge } from "./data-table";

type Row = Record<string, string | number | boolean | null | undefined>;
export function ResourcePage({ title, endpoint, columns, createHref, permission }: { title: string; endpoint: string; columns: Array<[string, string]>; createHref?: string; permission?: string }) {
  const [rows, setRows] = useState<Row[]>([]); const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  async function load(query = "") { setLoading(true); try { const result = await apiRequest<Row[] | { content?: Row[]; items?: Row[] }>(`${endpoint}${query ? `?q=${encodeURIComponent(query)}` : ""}`); setRows(Array.isArray(result) ? result : result.content ?? result.items ?? []); } catch (e) { setError(e instanceof Error ? e.message : "Unable to load data"); } finally { setLoading(false); } }
  useEffect(() => { load(); }, []);
  function submit(e: FormEvent) { e.preventDefault(); load(search); }
  return <main className="section"><div className="admin-title"><div><span className="eyebrow">ADMINISTRATION</span><h1>{title}</h1></div>{createHref && <a className="button" href={createHref}>Create new</a>}</div><form className="admin-search" onSubmit={submit}><input aria-label={`Search ${title}`} value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`} /><button className="button" type="submit">Search</button></form>{error && <p className="error">{error}</p>}{loading ? <p>Loading...</p> : <DataTable><thead><tr>{columns.map(([key, label]) => <th key={key}>{label}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={String(row.id ?? i)}>{columns.map(([key]) => <td key={key}>{key === "status" ? <StatusBadge value={String(row[key] ?? "UNKNOWN")} /> : String(row[key] ?? "-")}</td>)}</tr>)}</tbody></DataTable>}</main>;
}
