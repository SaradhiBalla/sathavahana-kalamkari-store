INSERT INTO categories (id, slug, name, description) VALUES
    (1, 'sarees', 'Kalamkari Sarees', 'Heritage-inspired sarees and draped cotton stories.'),
    (2, 'fabric', 'Kalamkari Fabric', 'Textile yardage designed for mindful wardrobes and interiors.'),
    (3, 'dupattas', 'Kalamkari Dupattas', 'Graceful drapes with floral and narrative detailing.'),
    (4, 'wall-hangings', 'Wall Hangings', 'Decor pieces that bring craft and artistry into the home.'),
    (5, 'artwork', 'Hand-Painted Artwork', 'Collector-worthy narrative artworks inspired by tradition.'),
    (6, 'home-decor', 'Home Decor', 'Textile and decorative pieces for lived-in spaces.'),
    (7, 'accessories', 'Accessories', 'Practical and wearable handcrafted accents.'),
    (8, 'dress-materials', 'Dress Materials', 'Festive fabrics for custom silhouettes and statement garments.');

INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, created_at) VALUES
    (1, 'demo@kalamkari.house', 'demo-password', 'Demo', 'Customer', '9876543210', 'CUSTOMER', CURRENT_TIMESTAMP);

INSERT INTO products (
    slug, name, category, price, description, stock_quantity, category_id, image_url, active, created_at, updated_at
) VALUES
    ('heritage-floral-kalamkari-saree', 'Heritage Floral Kalamkari Saree', 'sarees', 4850, 'A heritage-inspired Kalamkari saree presented with a contemporary sense of elegance.', 12, 1, '/images/heritage-floral-kalamkari-saree.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('indigo-botanical-hand-block-fabric', 'Indigo Botanical Hand Block Fabric', 'fabric', 1950, 'An indigo botanical-inspired textile suitable for thoughtful wardrobe and craft creations.', 20, 2, '/images/indigo-botanical-hand-block-fabric.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('earth-tone-floral-dupatta', 'Earth-Tone Floral Dupatta', 'dupattas', 1750, 'An earth-toned Kalamkari-inspired dupatta with an expressive floral character.', 18, 3, '/images/earth-tone-floral-dupatta.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('handcrafted-kalamkari-wall-art', 'Handcrafted Kalamkari Wall Art', 'wall-hangings', 3250, 'A heritage-inspired wall piece designed to bring artistic character into a living space.', 9, 4, '/images/handcrafted-kalamkari-wall-art.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('indigo-garden-kalamkari-saree', 'Indigo Garden Kalamkari Saree', 'sarees', 6200, 'An indigo-led floral saree inspired by botanical forms and traditional textile aesthetics.', 8, 1, '/images/indigo-garden-kalamkari-saree.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('maroon-floral-dress-material', 'Maroon Floral Dress Material', 'dress-materials', 2850, 'A rich dress-material concept combining warm Indian tones with floral-inspired detail.', 14, 8, '/images/maroon-floral-dress-material.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('mustard-botanical-kalamkari-fabric', 'Mustard Botanical Kalamkari Fabric', 'fabric', 2400, 'A warm mustard textile inspired by botanical forms and traditional Indian colour palettes.', 16, 2, '/images/mustard-botanical-kalamkari-fabric.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('traditional-story-panel', 'Traditional Story Panel', 'artwork', 7800, 'A decorative artwork inspired by the storytelling character of traditional Indian textile art.', 5, 5, '/images/traditional-story-panel.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('handcrafted-kalamkari-cushion-cover', 'Handcrafted Kalamkari Cushion Cover', 'home-decor', 1250, 'A heritage-inspired home accent designed to add artisanal character to contemporary interiors.', 22, 6, '/images/handcrafted-kalamkari-cushion-cover.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('artisan-floral-tote', 'Artisan Floral Tote', 'accessories', 1450, 'A practical everyday accessory featuring a Kalamkari-inspired visual language.', 27, 7, '/images/artisan-floral-tote.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('indigo-heritage-dupatta', 'Indigo Heritage Dupatta', 'dupattas', 2300, 'A graceful indigo dupatta inspired by traditional textile patterning.', 10, 3, '/images/indigo-heritage-dupatta.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('heritage-kalamkari-dress-material', 'Heritage Kalamkari Dress Material', 'dress-materials', 4550, 'A refined dress-material collection piece inspired by Indian textile heritage.', 11, 8, '/images/heritage-kalamkari-dress-material.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('floral-kalamkari-wall-panel', 'Floral Kalamkari Wall Panel', 'wall-hangings', 5600, 'A decorative wall panel inspired by botanical motifs and handcrafted textile aesthetics.', 6, 4, '/images/floral-kalamkari-wall-panel.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('hand-painted-heritage-artwork', 'Hand-Painted Heritage Artwork', 'artwork', 11200, 'A statement artwork created for collectors who appreciate Indian artistic expression.', 4, 5, '/images/hand-painted-heritage-artwork.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('kalamkari-heritage-table-runner', 'Kalamkari Heritage Table Runner', 'home-decor', 1950, 'A heritage-inspired textile accent designed for an elegant dining setting.', 13, 6, '/images/kalamkari-heritage-table-runner.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('botanical-kalamkari-saree', 'Botanical Kalamkari Saree', 'sarees', 8900, 'A statement saree inspired by botanical storytelling and the visual richness of Kalamkari.', 7, 1, '/images/botanical-kalamkari-saree.jpg', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);