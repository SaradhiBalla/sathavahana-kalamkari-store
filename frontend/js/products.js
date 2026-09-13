"use strict";

/* =========================================================
PRODUCT DATA
TEMPORARY FRONTEND DATA
WILL BE REPLACED BY SPRING BOOT API LATER
========================================================= */

const products = [
    {
        id: 1,
        name: "Heritage Floral Kalamkari Saree",
        category: "sarees",
        categoryLabel: "Kalamkari Sarees",
        price: 4850,
        oldPrice: null,
        badge: "Featured",
        artClass: "art-saree",
        artLabel: "Heritage",
        description:
            "A heritage-inspired Kalamkari saree presented with a contemporary sense of elegance."
    },

    {
        id: 2,
        name: "Indigo Botanical Hand Block Fabric",
        category: "fabric",
        categoryLabel: "Kalamkari Fabric",
        price: 1950,
        oldPrice: null,
        badge: "New",
        artClass: "art-fabric",
        artLabel: "Indigo",
        description:
            "An indigo botanical-inspired textile suitable for thoughtful wardrobe and craft creations."
    },

    {
        id: 3,
        name: "Earth-Tone Floral Dupatta",
        category: "dupattas",
        categoryLabel: "Kalamkari Dupattas",
        price: 1750,
        oldPrice: 2100,
        badge: "Sale",
        artClass: "art-dupattas",
        artLabel: "Floral",
        description:
            "An earth-toned Kalamkari-inspired dupatta with an expressive floral character."
    },

    {
        id: 4,
        name: "Handcrafted Kalamkari Wall Art",
        category: "wall-hangings",
        categoryLabel: "Wall Hangings",
        price: 3250,
        oldPrice: null,
        badge: "Featured",
        artClass: "art-wall",
        artLabel: "Art",
        description:
            "A heritage-inspired wall piece designed to bring artistic character into a living space."
    },

    {
        id: 5,
        name: "Indigo Garden Kalamkari Saree",
        category: "sarees",
        categoryLabel: "Kalamkari Sarees",
        price: 6200,
        oldPrice: null,
        badge: "New",
        artClass: "art-saree",
        artLabel: "Garden",
        description:
            "An indigo-led floral saree inspired by botanical forms and traditional textile aesthetics."
    },

    {
        id: 6,
        name: "Maroon Floral Dress Material",
        category: "dress-materials",
        categoryLabel: "Dress Materials",
        price: 2850,
        oldPrice: null,
        badge: null,
        artClass: "art-dress",
        artLabel: "Maroon",
        description:
            "A rich dress-material concept combining warm Indian tones with floral-inspired detail."
    },

    {
        id: 7,
        name: "Mustard Botanical Kalamkari Fabric",
        category: "fabric",
        categoryLabel: "Kalamkari Fabric",
        price: 2400,
        oldPrice: null,
        badge: null,
        artClass: "art-fabric",
        artLabel: "Botanical",
        description:
            "A warm mustard textile inspired by botanical forms and traditional Indian colour palettes."
    },

    {
        id: 8,
        name: "Traditional Story Panel",
        category: "artwork",
        categoryLabel: "Hand-Painted Artwork",
        price: 7800,
        oldPrice: 8500,
        badge: "Sale",
        artClass: "art-artwork",
        artLabel: "Story",
        description:
            "A decorative artwork inspired by the storytelling character of traditional Indian textile art."
    },

    {
        id: 9,
        name: "Handcrafted Kalamkari Cushion Cover",
        category: "home-decor",
        categoryLabel: "Home Decor",
        price: 1250,
        oldPrice: null,
        badge: "New",
        artClass: "art-decor",
        artLabel: "Decor",
        description:
            "A heritage-inspired home accent designed to add artisanal character to contemporary interiors."
    },

    {
        id: 10,
        name: "Artisan Floral Tote",
        category: "accessories",
        categoryLabel: "Accessories",
        price: 1450,
        oldPrice: 1650,
        badge: "Sale",
        artClass: "art-accessory",
        artLabel: "Artisan",
        description:
            "A practical everyday accessory featuring a Kalamkari-inspired visual language."
    },

    {
        id: 11,
        name: "Indigo Heritage Dupatta",
        category: "dupattas",
        categoryLabel: "Kalamkari Dupattas",
        price: 2300,
        oldPrice: null,
        badge: null,
        artClass: "art-dupattas",
        artLabel: "Indigo",
        description:
            "A graceful indigo dupatta inspired by traditional textile patterning."
    },

    {
        id: 12,
        name: "Heritage Kalamkari Dress Material",
        category: "dress-materials",
        categoryLabel: "Dress Materials",
        price: 4550,
        oldPrice: null,
        badge: "Featured",
        artClass: "art-dress",
        artLabel: "Heritage",
        description:
            "A refined dress-material collection piece inspired by Indian textile heritage."
    },

    {
        id: 13,
        name: "Floral Kalamkari Wall Panel",
        category: "wall-hangings",
        categoryLabel: "Wall Hangings",
        price: 5600,
        oldPrice: null,
        badge: null,
        artClass: "art-wall",
        artLabel: "Floral",
        description:
            "A decorative wall panel inspired by botanical motifs and handcrafted textile aesthetics."
    },

    {
        id: 14,
        name: "Hand-Painted Heritage Artwork",
        category: "artwork",
        categoryLabel: "Hand-Painted Artwork",
        price: 11200,
        oldPrice: null,
        badge: "Featured",
        artClass: "art-artwork",
        artLabel: "Heritage",
        description:
            "A statement artwork created for collectors who appreciate Indian artistic expression."
    },

    {
        id: 15,
        name: "Kalamkari Heritage Table Runner",
        category: "home-decor",
        categoryLabel: "Home Decor",
        price: 1950,
        oldPrice: 2250,
        badge: "Sale",
        artClass: "art-decor",
        artLabel: "Craft",
        description:
            "A heritage-inspired textile accent designed for an elegant dining setting."
    },

    {
        id: 16,
        name: "Botanical Kalamkari Saree",
        category: "sarees",
        categoryLabel: "Kalamkari Sarees",
        price: 8900,
        oldPrice: null,
        badge: "Featured",
        artClass: "art-saree",
        artLabel: "Botanical",
        description:
            "A statement saree inspired by botanical storytelling and the visual richness of Kalamkari."
    }
];

/* =========================================================
APPLICATION STATE
========================================================= */

const catalogState = {
    search: "",
    category: "all",
    price: "all",
    sort: "featured",
    currentPage: 1,
    itemsPerPage: 8,
    wishlist: new Set(),
    currentQuickViewProductId: null
};

/* =========================================================
DOM ELEMENTS
========================================================= */

const elements = {};

/* =========================================================
INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    cacheElements();
    initializeCatalog();
});

/* =========================================================
CACHE DOM ELEMENTS
========================================================= */

function cacheElements() {
    elements.productGrid =
        document.getElementById("productGrid");

    elements.productResultCount =
        document.getElementById("productResultCount");

    elements.mobileResultCount =
        document.getElementById("mobileResultCount");

    elements.productSearch =
        document.getElementById("productSearch");

    elements.searchClearButton =
        document.getElementById("searchClearButton");

    elements.productSort =
        document.getElementById("productSort");

    elements.paginationPages =
        document.getElementById("paginationPages");

    elements.previousPageButton =
        document.getElementById("previousPageButton");

    elements.nextPageButton =
        document.getElementById("nextPageButton");

    elements.emptyProductState =
        document.getElementById("emptyProductState");

    elements.emptyStateResetButton =
        document.getElementById("emptyStateResetButton");

    elements.clearFiltersButton =
        document.getElementById("clearFiltersButton");

    elements.mobileFilterToggle =
        document.getElementById("mobileFilterToggle");

    elements.filterCloseButton =
        document.getElementById("filterCloseButton");

    elements.catalogFilters =
        document.getElementById("catalogFilters");

    elements.quickViewModal =
        document.getElementById("quickViewModal");

    elements.quickViewImage =
        document.getElementById("quickViewImage");

    elements.quickViewCategory =
        document.getElementById("quickViewCategory");

    elements.quickViewProductName =
        document.getElementById("quickViewProductName");

    elements.quickViewPrice =
        document.getElementById("quickViewPrice");

    elements.quickViewDescription =
        document.getElementById("quickViewDescription");

    elements.quickViewCartButton =
        document.getElementById("quickViewCartButton");

    elements.quickViewDetailsLink =
        document.getElementById("quickViewDetailsLink");
}

/* =========================================================
INITIALIZE CATALOG
========================================================= */

function initializeCatalog() {
    if (!elements.productGrid) {
        return;
    }

    initializeFilterEvents();
    initializeSearch();
    initializeSorting();
    initializePagination();
    initializeQuickView();
    initializeMobileFilters();

    applyCategoryFromUrl();
    renderCatalog();
}

/* =========================================================
FILTER EVENTS
========================================================= */

function initializeFilterEvents() {
    const categoryInputs =
        document.querySelectorAll(
            'input[name="category"]'
        );

    categoryInputs.forEach((input) => {
        input.addEventListener("change", () => {
            catalogState.category = input.value;
            catalogState.currentPage = 1;

            renderCatalog();
            closeMobileFilters();
        });
    });

    const priceInputs =
        document.querySelectorAll(
            'input[name="price"]'
        );

    priceInputs.forEach((input) => {
        input.addEventListener("change", () => {
            catalogState.price = input.value;
            catalogState.currentPage = 1;

            renderCatalog();
            closeMobileFilters();
        });
    });
}

/* =========================================================
SEARCH
========================================================= */

function initializeSearch() {
    if (!elements.productSearch) {
        return;
    }

    elements.productSearch.addEventListener(
        "input",
        () => {
            catalogState.search =
                elements.productSearch.value.trim();

            catalogState.currentPage = 1;

            updateSearchClearButton();
            renderCatalog();
        }
    );

    if (elements.searchClearButton) {
        elements.searchClearButton.addEventListener(
            "click",
            () => {
                elements.productSearch.value = "";
                catalogState.search = "";
                catalogState.currentPage = 1;

                updateSearchClearButton();
                renderCatalog();

                elements.productSearch.focus();
            }
        );
    }
}

/* =========================================================
SORTING
========================================================= */

function initializeSorting() {
    if (!elements.productSort) {
        return;
    }

    elements.productSort.addEventListener(
        "change",
        () => {
            catalogState.sort =
                elements.productSort.value;

            catalogState.currentPage = 1;

            renderCatalog();
        }
    );
}

/* =========================================================
PAGINATION
========================================================= */

function initializePagination() {
    if (elements.previousPageButton) {
        elements.previousPageButton.addEventListener(
            "click",
            () => {
                if (catalogState.currentPage <= 1) {
                    return;
                }

                catalogState.currentPage--;

                renderCatalog();
                scrollToCatalogTop();
            }
        );
    }

    if (elements.nextPageButton) {
        elements.nextPageButton.addEventListener(
            "click",
            () => {
                const totalPages =
                    calculateTotalPages(
                        getFilteredProducts()
                    );

                if (
                    catalogState.currentPage >=
                    totalPages
                ) {
                    return;
                }

                catalogState.currentPage++;

                renderCatalog();
                scrollToCatalogTop();
            }
        );
    }
}

/* =========================================================
QUICK VIEW
========================================================= */

function initializeQuickView() {
    if (
        !elements.quickViewModal ||
        !elements.quickViewCartButton
    ) {
        return;
    }

    elements.quickViewCartButton.addEventListener(
        "click",
        () => {
            const product =
                products.find(
                    (item) =>
                        item.id ===
                        catalogState.currentQuickViewProductId
                );

            if (!product) {
                return;
            }

            addToCart(product);
        }
    );
}

/* =========================================================
MOBILE FILTERS
========================================================= */

function initializeMobileFilters() {
    if (elements.mobileFilterToggle) {
        elements.mobileFilterToggle.addEventListener(
            "click",
            () => {
                if (!elements.catalogFilters) {
                    return;
                }

                elements.catalogFilters.classList.add(
                    "mobile-open"
                );

                elements.mobileFilterToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                document.body.classList.add(
                    "catalog-filter-open"
                );
            }
        );
    }

    if (elements.filterCloseButton) {
        elements.filterCloseButton.addEventListener(
            "click",
            closeMobileFilters
        );
    }

    if (elements.clearFiltersButton) {
        elements.clearFiltersButton.addEventListener(
            "click",
            resetCatalog
        );
    }

    if (elements.emptyStateResetButton) {
        elements.emptyStateResetButton.addEventListener(
            "click",
            resetCatalog
        );
    }
}

/* =========================================================
CATEGORY FROM URL
========================================================= */

function applyCategoryFromUrl() {
    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");

    if (!category) {
        return;
    }

    const validCategories = new Set([
        "sarees",
        "dress-materials",
        "dupattas",
        "fabric",
        "wall-hangings",
        "artwork",
        "home-decor",
        "accessories"
    ]);

    if (!validCategories.has(category)) {
        return;
    }

    catalogState.category = category;

    const matchingInput =
        document.querySelector(
            `input[name="category"][value="${CSS.escape(category)}"]`
        );

    if (matchingInput) {
        matchingInput.checked = true;
    }
}

/* =========================================================
GET FILTERED PRODUCTS
========================================================= */

function getFilteredProducts() {
    let filtered = [...products];

    /* SEARCH */

    if (catalogState.search) {
        const searchTerm =
            catalogState.search.toLowerCase();

        filtered = filtered.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(searchTerm) ||
                product.categoryLabel
                    .toLowerCase()
                    .includes(searchTerm) ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm)
        );
    }

    /* CATEGORY */

    if (catalogState.category !== "all") {
        filtered = filtered.filter(
            (product) =>
                product.category ===
                catalogState.category
        );
    }

    /* PRICE */

    filtered = filtered.filter(
        matchesPriceFilter
    );

    /* SORT */

    filtered = sortProducts(filtered);

    return filtered;
}

/* =========================================================
PRICE FILTER
========================================================= */

function matchesPriceFilter(product) {
    const price =
        getEffectivePrice(product);

    switch (catalogState.price) {
        case "under-2000":
            return price < 2000;

        case "2000-5000":
            return (
                price >= 2000 &&
                price <= 5000
            );

        case "5000-10000":
            return (
                price > 5000 &&
                price <= 10000
            );

        case "above-10000":
            return price > 10000;

        case "all":
        default:
            return true;
    }
}

/* =========================================================
EFFECTIVE PRICE
========================================================= */

function getEffectivePrice(product) {
    return product.price;
}

/* =========================================================
SORT PRODUCTS
========================================================= */

function sortProducts(productList) {
    const sorted = [...productList];

    switch (catalogState.sort) {
        case "price-low":
            return sorted.sort(
                (a, b) =>
                    getEffectivePrice(a) -
                    getEffectivePrice(b)
            );

        case "price-high":
            return sorted.sort(
                (a, b) =>
                    getEffectivePrice(b) -
                    getEffectivePrice(a)
            );

        case "name-asc":
            return sorted.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

        case "name-desc":
            return sorted.sort(
                (a, b) =>
                    b.name.localeCompare(a.name)
            );

        case "featured":
        default:
            return sorted.sort(
                (a, b) =>
                    getFeaturedWeight(b) -
                    getFeaturedWeight(a)
            );
    }
}

/* =========================================================
FEATURED WEIGHT
========================================================= */

function getFeaturedWeight(product) {
    if (product.badge === "Featured") {
        return 4;
    }

    if (product.badge === "New") {
        return 3;
    }

    if (product.badge === "Sale") {
        return 2;
    }

    return 1;
}
/* =========================================================
RENDER CATALOG
========================================================= */

function renderCatalog() {
    const filteredProducts =
        getFilteredProducts();

    updateResultCount(
        filteredProducts.length
    );

    if (
        filteredProducts.length === 0
    ) {
        renderEmptyState();

        renderPagination(0);

        return;
    }

    hideEmptyState();

    const totalPages =
        calculateTotalPages(
            filteredProducts
        );

    if (
        catalogState.currentPage >
        totalPages
    ) {
        catalogState.currentPage =
            totalPages;
    }

    const visibleProducts =
        getPaginatedProducts(
            filteredProducts
        );

    renderProductCards(
        visibleProducts
    );

    renderPagination(
        totalPages
    );
}

/* =========================================================
PAGINATION CALCULATION
========================================================= */

function calculateTotalPages(
    productList
) {
    return Math.max(
        1,
        Math.ceil(
            productList.length /
            catalogState.itemsPerPage
        )
    );
}

/* =========================================================
GET PAGINATED PRODUCTS
========================================================= */

function getPaginatedProducts(
    productList
) {
    const start =
        (
            catalogState.currentPage -
            1
        ) *
        catalogState.itemsPerPage;

    const end =
        start +
        catalogState.itemsPerPage;

    return productList.slice(
        start,
        end
    );
}

/* =========================================================
RENDER PRODUCT CARDS
========================================================= */

function renderProductCards(
    productList
) {
    elements.productGrid.innerHTML =
        productList
            .map(
                createProductCard
            )
            .join("");
}

/* =========================================================
CREATE PRODUCT CARD
========================================================= */

function createProductCard(
    product
) {
    const isWishlisted =
        catalogState.wishlist.has(
            product.id
        );

    const badgeHtml =
        product.badge
            ? `
                <span class="product-badge">
                    ${escapeHtml(product.badge)}
                </span>
              `
            : "";

    const oldPriceHtml =
        product.oldPrice
            ? `
                <span class="catalog-product-old-price">
                    ${formatCurrency(product.oldPrice)}
                </span>
              `
            : "";

    return `
        <div class="col-6 col-md-4 col-xl-3">

            <article
                class="catalog-product-card"
                data-product-id="${product.id}"
            >

                <div class="catalog-product-image">

                    ${badgeHtml}

                    <button
                        type="button"
                        class="product-wishlist-btn ${
                            isWishlisted
                                ? "is-active"
                                : ""
                        }"
                        data-action="wishlist"
                        data-product-id="${product.id}"
                        aria-label="${
                            isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }"
                    >

                        <i
                            class="bi ${
                                isWishlisted
                                    ? "bi-heart-fill"
                                    : "bi-heart"
                            }"
                            aria-hidden="true"
                        ></i>

                    </button>

                    <a
                        href="product-details.html?id=${product.id}"
                        class="catalog-product-art ${
                            product.artClass
                        }"
                        aria-label="View ${
                            escapeHtml(product.name)
                        }"
                    >

                        <span class="catalog-art-label">
                            ${escapeHtml(product.artLabel)}
                        </span>

                    </a>

                    <button
                        type="button"
                        class="product-quick-view"
                        data-action="quick-view"
                        data-product-id="${product.id}"
                    >

                        <i
                            class="bi bi-eye me-1"
                            aria-hidden="true"
                        ></i>

                        Quick View

                    </button>

                </div>

                <div class="catalog-product-body">

                    <div class="catalog-product-category">
                        ${escapeHtml(
                            product.categoryLabel
                        )}
                    </div>

                    <h2 class="catalog-product-name">
                        ${escapeHtml(product.name)}
                    </h2>

                    <div class="catalog-product-price">

                        ${formatCurrency(
                            product.price
                        )}

                        ${oldPriceHtml}

                    </div>

                    <div class="catalog-product-footer">

                        <button
                            type="button"
                            class="product-add-cart"
                            data-action="cart"
                            data-product-id="${product.id}"
                        >

                            <i
                                class="bi bi-bag-plus"
                                aria-hidden="true"
                            ></i>

                            Add to Cart

                        </button>

                        <a
                            href="product-details.html?id=${product.id}"
                            class="product-view-link"
                        >
                            Details
                        </a>

                    </div>

                </div>

            </article>

        </div>
    `;
}

/* =========================================================
PRODUCT GRID ACTIONS
========================================================= */

document.addEventListener(
    "click",
    (event) => {
        const actionElement =
            event.target.closest(
                "[data-action]"
            );

        if (!actionElement) {
            return;
        }

        const action =
            actionElement.dataset.action;

        const productId =
            Number(
                actionElement.dataset.productId
            );

        if (!productId) {
            return;
        }

        const product =
            products.find(
                (item) =>
                    item.id === productId
            );

        if (!product) {
            return;
        }

        if (
            action ===
            "wishlist"
        ) {
            toggleWishlist(
                product
            );
        }

        if (
            action ===
            "cart"
        ) {
            addToCart(
                product
            );
        }

        if (
            action ===
            "quick-view"
        ) {
            openQuickView(
                product
            );
        }
    }
);

/* =========================================================
WISHLIST
========================================================= */

function toggleWishlist(
    product
) {
    if (
        catalogState.wishlist.has(
            product.id
        )
    ) {
        catalogState.wishlist.delete(
            product.id
        );

        showCatalogToast(
            `${product.name} removed from your wishlist.`
        );
    } else {
        catalogState.wishlist.add(
            product.id
        );

        showCatalogToast(
            `${product.name} added to your wishlist.`
        );
    }

    renderCatalog();
}

/* =========================================================
ADD TO CART
========================================================= */

function addToCart(
    product
) {
    const cart =
        readCart();

    const existingItem =
        cart.find(
            (item) =>
                item.productId ===
                product.id
        );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: product.id,
            quantity: 1
        });
    }

    writeCart(
        cart
    );

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    if (
        window.SathavahanaApp &&
        typeof window.SathavahanaApp
            .updateCartCount ===
            "function"
    ) {
        window.SathavahanaApp.updateCartCount(
            totalQuantity
        );
    }

    showCatalogToast(
        `${product.name} added to your cart.`
    );
}

/* =========================================================
CART STORAGE
========================================================= */

function readCart() {
    try {
        const storedCart =
            localStorage.getItem(
                "sathavahana_cart"
            );

        if (!storedCart) {
            return [];
        }

        const parsedCart =
            JSON.parse(
                storedCart
            );

        if (
            !Array.isArray(
                parsedCart
            )
        ) {
            return [];
        }

        return parsedCart.filter(
            (item) =>
                Number.isInteger(
                    item.productId
                ) &&
                Number.isInteger(
                    item.quantity
                ) &&
                item.quantity > 0
        );
    } catch (error) {
        console.error(
            "Unable to read cart:",
            error
        );

        return [];
    }
}

function writeCart(
    cart
) {
    try {
        localStorage.setItem(
            "sathavahana_cart",
            JSON.stringify(
                cart
            )
        );
    } catch (error) {
        console.error(
            "Unable to save cart:",
            error
        );
    }
}
/* =========================================================
QUICK VIEW
========================================================= */

function openQuickView(
    product
) {
    if (
        !elements.quickViewModal
    ) {
        return;
    }

    catalogState.currentQuickViewProductId =
        product.id;

    if (elements.quickViewCategory) {
        elements.quickViewCategory.textContent =
            product.categoryLabel;
    }

    if (elements.quickViewProductName) {
        elements.quickViewProductName.textContent =
            product.name;
    }

    if (elements.quickViewPrice) {
        elements.quickViewPrice.textContent =
            formatCurrency(
                product.price
            );
    }

    if (elements.quickViewDescription) {
        elements.quickViewDescription.textContent =
            product.description;
    }

    if (elements.quickViewImage) {
        elements.quickViewImage.className =
            `quick-view-image catalog-product-art ${product.artClass}`;

        elements.quickViewImage.innerHTML =
            `
                <span class="catalog-art-label">
                    ${escapeHtml(product.artLabel)}
                </span>
            `;
    }

    if (elements.quickViewDetailsLink) {
        elements.quickViewDetailsLink.href =
            `product-details.html?id=${product.id}`;
    }

    if (
        typeof bootstrap === "undefined" ||
        !bootstrap.Modal
    ) {
        console.warn(
            "Bootstrap Modal is not available."
        );

        return;
    }

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            elements.quickViewModal
        );

    modal.show();
}

/* =========================================================
SEARCH CLEAR BUTTON
========================================================= */

function updateSearchClearButton() {
    if (
        !elements.searchClearButton
    ) {
        return;
    }

    const hasSearch =
        Boolean(
            catalogState.search
        );

    elements.searchClearButton.classList.toggle(
        "visible",
        hasSearch
    );
}

/* =========================================================
RESULT COUNT
========================================================= */

function updateResultCount(
    count
) {
    if (
        elements.productResultCount
    ) {
        elements.productResultCount.textContent =
            count;
    }

    if (
        elements.mobileResultCount
    ) {
        elements.mobileResultCount.textContent =
            `${count} ${
                count === 1
                    ? "product"
                    : "products"
            }`;
    }
}

/* =========================================================
PAGINATION UI
========================================================= */

function renderPagination(
    totalPages
) {
    if (
        !elements.paginationPages
    ) {
        return;
    }

    elements.paginationPages.innerHTML =
        "";

    if (
        totalPages <= 1
    ) {
        elements.paginationPages.style.display =
            "none";
    } else {
        elements.paginationPages.style.display =
            "flex";
    }

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {
        const button =
            document.createElement(
                "button"
            );

        button.type =
            "button";

        button.className =
            "pagination-page";

        if (
            page ===
            catalogState.currentPage
        ) {
            button.classList.add(
                "active"
            );

            button.setAttribute(
                "aria-current",
                "page"
            );
        }

        button.textContent =
            page;

        button.addEventListener(
            "click",
            () => {
                catalogState.currentPage =
                    page;

                renderCatalog();

                scrollToCatalogTop();
            }
        );

        elements.paginationPages.appendChild(
            button
        );
    }

    if (
        elements.previousPageButton
    ) {
        elements.previousPageButton.disabled =
            catalogState.currentPage <= 1;
    }

    if (
        elements.nextPageButton
    ) {
        elements.nextPageButton.disabled =
            catalogState.currentPage >=
            totalPages;
    }
}

/* =========================================================
EMPTY STATE
========================================================= */

function renderEmptyState() {
    if (
        elements.productGrid
    ) {
        elements.productGrid.innerHTML =
            "";
    }

    if (
        elements.emptyProductState
    ) {
        elements.emptyProductState.classList.remove(
            "d-none"
        );
    }
}

function hideEmptyState() {
    if (
        elements.emptyProductState
    ) {
        elements.emptyProductState.classList.add(
            "d-none"
        );
    }
}

/* =========================================================
RESET CATALOG
========================================================= */

function resetCatalog() {
    catalogState.search =
        "";

    catalogState.category =
        "all";

    catalogState.price =
        "all";

    catalogState.sort =
        "featured";

    catalogState.currentPage =
        1;

    if (
        elements.productSearch
    ) {
        elements.productSearch.value =
            "";
    }

    if (
        elements.productSort
    ) {
        elements.productSort.value =
            "featured";
    }

    const categoryAll =
        document.querySelector(
            'input[name="category"][value="all"]'
        );

    if (
        categoryAll
    ) {
        categoryAll.checked =
            true;
    }

    const priceAll =
        document.querySelector(
            'input[name="price"][value="all"]'
        );

    if (
        priceAll
    ) {
        priceAll.checked =
            true;
    }

    updateSearchClearButton();

    closeMobileFilters();

    renderCatalog();
}

/* =========================================================
CLOSE MOBILE FILTERS
========================================================= */

function closeMobileFilters() {
    if (
        elements.catalogFilters
    ) {
        elements.catalogFilters.classList.remove(
            "mobile-open"
        );
    }

    if (
        elements.mobileFilterToggle
    ) {
        elements.mobileFilterToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    document.body.classList.remove(
        "catalog-filter-open"
    );
}

/* =========================================================
SCROLL TO CATALOG
========================================================= */

function scrollToCatalogTop() {
    const catalogSection =
        document.querySelector(
            ".products-catalog-section"
        );

    if (
        !catalogSection
    ) {
        return;
    }

    const headerOffset =
        90;

    const top =
        catalogSection.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

    window.scrollTo({
        top,
        behavior: "smooth"
    });
}

/* =========================================================
CURRENCY
========================================================= */

function formatCurrency(
    amount
) {
    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(
        amount
    );
}

/* =========================================================
HTML ESCAPING
========================================================= */

function escapeHtml(
    value
) {
    return String(
        value
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

/* =========================================================
TOAST
========================================================= */

function showCatalogToast(
    message
) {
    if (
        window.SathavahanaApp &&
        typeof window.SathavahanaApp.showToast ===
            "function"
    ) {
        window.SathavahanaApp.showToast(
            message
        );

        return;
    }

    console.log(
        message
    );
}