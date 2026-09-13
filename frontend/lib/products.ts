export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  price: number;
  description: string;
  artClass: string;
  artLabel: string;
};

export const products: Product[] = [
  { id: 1, slug: "heritage-floral-kalamkari-saree", name: "Heritage Floral Kalamkari Saree", category: "sarees", categoryLabel: "Kalamkari Sarees", price: 4850, description: "A heritage-inspired Kalamkari saree presented with a contemporary sense of elegance.", artClass: "saree", artLabel: "Heritage" },
  { id: 2, slug: "indigo-botanical-hand-block-fabric", name: "Indigo Botanical Hand Block Fabric", category: "fabric", categoryLabel: "Kalamkari Fabric", price: 1950, description: "An indigo botanical-inspired textile suitable for thoughtful wardrobe and craft creations.", artClass: "fabric", artLabel: "Indigo" },
  { id: 3, slug: "earth-tone-floral-dupatta", name: "Earth-Tone Floral Dupatta", category: "dupattas", categoryLabel: "Kalamkari Dupattas", price: 1750, description: "An earth-toned Kalamkari-inspired dupatta with an expressive floral character.", artClass: "dupatta", artLabel: "Floral" },
  { id: 4, slug: "handcrafted-kalamkari-wall-art", name: "Handcrafted Kalamkari Wall Art", category: "wall-hangings", categoryLabel: "Wall Hangings", price: 3250, description: "A heritage-inspired wall piece designed to bring artistic character into a living space.", artClass: "wall", artLabel: "Art" },
  { id: 5, slug: "indigo-garden-kalamkari-saree", name: "Indigo Garden Kalamkari Saree", category: "sarees", categoryLabel: "Kalamkari Sarees", price: 6200, description: "An indigo-led floral saree inspired by botanical forms and traditional textile aesthetics.", artClass: "saree", artLabel: "Garden" },
  { id: 6, slug: "maroon-floral-dress-material", name: "Maroon Floral Dress Material", category: "dress-materials", categoryLabel: "Dress Materials", price: 2850, description: "A rich dress-material concept combining warm Indian tones with floral-inspired detail.", artClass: "wall", artLabel: "Maroon" },
  { id: 7, slug: "mustard-botanical-kalamkari-fabric", name: "Mustard Botanical Kalamkari Fabric", category: "fabric", categoryLabel: "Kalamkari Fabric", price: 2400, description: "A warm mustard textile inspired by botanical forms and traditional Indian colour palettes.", artClass: "fabric", artLabel: "Botanical" },
  { id: 8, slug: "traditional-story-panel", name: "Traditional Story Panel", category: "artwork", categoryLabel: "Hand-Painted Artwork", price: 7800, description: "A decorative artwork inspired by the storytelling character of traditional Indian textile art.", artClass: "wall", artLabel: "Story" },
  { id: 9, slug: "handcrafted-kalamkari-cushion-cover", name: "Handcrafted Kalamkari Cushion Cover", category: "home-decor", categoryLabel: "Home Decor", price: 1250, description: "A heritage-inspired home accent designed to add artisanal character to contemporary interiors.", artClass: "dupatta", artLabel: "Decor" },
  { id: 10, slug: "artisan-floral-tote", name: "Artisan Floral Tote", category: "accessories", categoryLabel: "Accessories", price: 1450, description: "A practical everyday accessory featuring a Kalamkari-inspired visual language.", artClass: "fabric", artLabel: "Artisan" },
  { id: 11, slug: "indigo-heritage-dupatta", name: "Indigo Heritage Dupatta", category: "dupattas", categoryLabel: "Kalamkari Dupattas", price: 2300, description: "A graceful indigo dupatta inspired by traditional textile patterning.", artClass: "dupatta", artLabel: "Indigo" },
  { id: 12, slug: "heritage-kalamkari-dress-material", name: "Heritage Kalamkari Dress Material", category: "dress-materials", categoryLabel: "Dress Materials", price: 4550, description: "A refined dress-material collection piece inspired by Indian textile heritage.", artClass: "wall", artLabel: "Heritage" },
  { id: 13, slug: "floral-kalamkari-wall-panel", name: "Floral Kalamkari Wall Panel", category: "wall-hangings", categoryLabel: "Wall Hangings", price: 5600, description: "A decorative wall panel inspired by botanical motifs and handcrafted textile aesthetics.", artClass: "wall", artLabel: "Floral" },
  { id: 14, slug: "hand-painted-heritage-artwork", name: "Hand-Painted Heritage Artwork", category: "artwork", categoryLabel: "Hand-Painted Artwork", price: 11200, description: "A statement artwork created for collectors who appreciate Indian artistic expression.", artClass: "wall", artLabel: "Heritage" },
  { id: 15, slug: "kalamkari-heritage-table-runner", name: "Kalamkari Heritage Table Runner", category: "home-decor", categoryLabel: "Home Decor", price: 1950, description: "A heritage-inspired textile accent designed for an elegant dining setting.", artClass: "dupatta", artLabel: "Craft" },
  { id: 16, slug: "botanical-kalamkari-saree", name: "Botanical Kalamkari Saree", category: "sarees", categoryLabel: "Kalamkari Sarees", price: 8900, description: "A statement saree inspired by botanical storytelling and the visual richness of Kalamkari.", artClass: "saree", artLabel: "Botanical" }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
