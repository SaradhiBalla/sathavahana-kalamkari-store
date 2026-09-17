import { ResourcePage } from "../../../components/admin/resource-page";
export default function ProductsAdminPage() { return <ResourcePage title="Products" endpoint="/admin/products" createHref="/admin/products/new" columns={[["name", "Product"], ["sku", "SKU"], ["categoryName", "Category"], ["price", "Price"], ["stockQuantity", "Stock"], ["status", "Status"]]} />; }
