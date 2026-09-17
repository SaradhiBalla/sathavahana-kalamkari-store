import { notFound } from "next/navigation";
import { formatCurrency, getProduct, getProductSync } from "../../../lib/products";

export function generateStaticParams() {
  return getProductSync("heritage-floral-kalamkari-saree") ? [
    { slug: "heritage-floral-kalamkari-saree" },
    { slug: "indigo-botanical-hand-block-fabric" },
    { slug: "earth-tone-floral-dupatta" },
    { slug: "handcrafted-kalamkari-wall-art" },
    { slug: "indigo-garden-kalamkari-saree" },
    { slug: "maroon-floral-dress-material" },
    { slug: "mustard-botanical-kalamkari-fabric" },
    { slug: "traditional-story-panel" },
    { slug: "handcrafted-kalamkari-cushion-cover" },
    { slug: "artisan-floral-tote" },
    { slug: "indigo-heritage-dupatta" },
    { slug: "heritage-kalamkari-dress-material" },
    { slug: "floral-kalamkari-wall-panel" },
    { slug: "hand-painted-heritage-artwork" },
    { slug: "kalamkari-heritage-table-runner" },
    { slug: "botanical-kalamkari-saree" }
  ] : [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const product = await getProduct(slug);
  if (!product) notFound();
  return <main className="container section"><div className="product-grid"><div className={`product-art ${product.artClass}`}>{product.artLabel}</div><div><span className="eyebrow">{product.categoryLabel}</span><h1>{product.name}</h1><p className="price">{formatCurrency(product.price)}</p><p className="muted">{product.description}</p><button className="button" type="button">Add to cart</button></div></div></main>;
}
