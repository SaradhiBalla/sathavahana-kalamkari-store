import { ResourcePage } from "../../../components/admin/resource-page";
export default function CustomersAdminPage() { return <ResourcePage title="Customers" endpoint="/admin/customers" columns={[["name", "Name"], ["email", "Email"], ["phone", "Phone"], ["role", "Role"], ["status", "Status"], ["orderCount", "Orders"]]} />; }
