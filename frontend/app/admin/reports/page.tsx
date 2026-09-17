"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "../../../lib/api/client";
export default function ReportsPage() { const [data, setData] = useState<Record<string, unknown> | null>(null); const [error, setError] = useState(""); useEffect(() => { apiRequest<Record<string, unknown>>("/admin/reports?range=30d").then(setData).catch(e => setError(e.message)); }, []); return <main className="section"><span className="eyebrow">ANALYTICS</span><h1>Reports</h1>{error ? <p className="error">{error}</p> : !data ? <p>Loading reports...</p> : <pre className="report-json">{JSON.stringify(data, null, 2)}</pre>}</main>; }
