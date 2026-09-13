import Link from "next/link";
import { formatCurrency, type Product } from "../../lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`}>
        <div className={`product-art ${product.artClass}`} aria-label={product.name}>{product.artLabel}</div>
        <div className="muted">{product.categoryLabel}</div>
        <h3>{product.name}</h3>
        <div className="price">{formatCurrency(product.price)}</div>
      </Link>
    </article>
  );
}
