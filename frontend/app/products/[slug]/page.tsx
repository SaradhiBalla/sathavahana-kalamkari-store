import { notFound } from "next/navigation";
import { formatCurrency, getProduct, products } from "../../../lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <main className="container section"><div className="product-grid"><div className={`product-art ${product.artClass}`}>{product.artLabel}</div><div><span className="eyebrow">{product.categoryLabel}</span><h1>{product.name}</h1><p className="price">{formatCurrency(product.price)}</p><p className="muted">{product.description}</p><button className="button" type="button">Add to cart</button></div></div></main>;
}
