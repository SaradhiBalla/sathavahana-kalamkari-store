import { ResourcePage } from "../../../components/admin/resource-page";
export default function CategoriesAdminPage() { return <ResourcePage title="Categories" endpoint="/admin/categories" createHref="/admin/categories/new" columns={[["name", "Name"], ["slug", "Slug"], ["productCount", "Products"], ["status", "Status"]]} />; }
