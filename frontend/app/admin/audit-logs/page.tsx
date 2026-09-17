import { ResourcePage } from "../../../components/admin/resource-page";
export default function AuditLogsPage() { return <ResourcePage title="Audit logs" endpoint="/admin/audit-logs" columns={[["actorName", "Actor"], ["action", "Action"], ["entityType", "Entity"], ["entityId", "ID"], ["createdAt", "Timestamp"]]} />; }
