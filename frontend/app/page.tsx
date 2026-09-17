import Link from "next/link";
import { ProductCard } from "../components/products/product-card";
import { getProducts } from "../lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <section className="container hero">
        <span className="eyebrow">THE ART OF HERITAGE</span>
        <h1>Tradition, <span>painted with purpose.</span></h1>
        <p>Discover heritage-inspired textiles and handcrafted creations that carry the warmth, artistry and storytelling spirit of Kalamkari.</p>
        <Link className="button" href="/products">Explore the collection</Link>
      </section>
      <section className="container section">
        <span className="eyebrow">CURATED COLLECTION</span>
        <h2>Made to be remembered.</h2>
        <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>
    </main>
  );
}
