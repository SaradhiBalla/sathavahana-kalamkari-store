import { ProductCard } from "../../components/products/product-card";
import { products } from "../../lib/products";

export const metadata = { title: "Collection" };

export default function ProductsPage() {
  return <main className="container section"><span className="eyebrow">THE COLLECTION</span><h1>Discover the Art of Kalamkari.</h1><p className="muted">Explore heritage-inspired textiles, handcrafted creations and artistic pieces.</p><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></main>;
}
