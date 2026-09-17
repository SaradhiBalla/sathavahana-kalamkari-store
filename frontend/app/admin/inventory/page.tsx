import { ResourcePage } from "../../../components/admin/resource-page";
export default function InventoryAdminPage() { return <ResourcePage title="Inventory" endpoint="/admin/inventory" columns={[["productName", "Product"], ["sku", "SKU"], ["stockQuantity", "Current stock"], ["lowStockThreshold", "Low-stock threshold"], ["lastTransactionAt", "Last change"]]} />; }
