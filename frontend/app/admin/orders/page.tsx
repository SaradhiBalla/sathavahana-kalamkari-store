import { ResourcePage } from "../../../components/admin/resource-page";
export default function OrdersAdminPage() { return <ResourcePage title="Orders" endpoint="/admin/orders" columns={[["orderNumber", "Order"], ["customerName", "Customer"], ["createdAt", "Date"], ["total", "Total"], ["paymentStatus", "Payment"], ["status", "Status"]]} />; }
