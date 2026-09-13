"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const productId = Number(new URLSearchParams(window.location.search).get("id"));
    const product = products.find((item) => item.id === productId);
    const details = document.getElementById("productDetails");
    const notFound = document.getElementById("productNotFound");

    if (!product || !details) {
        if (notFound) {
            notFound.classList.remove("d-none");
        }
        return;
    }

    details.innerHTML = `
        <div class="col-lg-6">
            <div class="catalog-product-art ${product.artClass}" style="min-height: 420px;">
                <span class="catalog-art-label">${escapeHtml(product.artLabel)}</span>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="catalog-product-category">${escapeHtml(product.categoryLabel)}</div>
            <h1>${escapeHtml(product.name)}</h1>
            <p class="fs-4">${formatCurrency(product.price)}</p>
            <p>${escapeHtml(product.description)}</p>
            <button type="button" class="btn btn-primary-custom" id="addProductToCart">
                <i class="bi bi-bag-plus me-1" aria-hidden="true"></i>
                Add to Cart
            </button>
            <a class="btn btn-outline-custom ms-2" href="products.html">Back to Collection</a>
        </div>
    `;

    document.getElementById("addProductToCart").addEventListener("click", () => {
        const cart = readCart();
        const existing = cart.find((item) => item.productId === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ productId: product.id, quantity: 1 });
        }
        writeCart(cart);
        const quantity = cart.reduce((total, item) => total + item.quantity, 0);
        window.SathavahanaApp.updateCartCount(quantity);
        window.SathavahanaApp.showToast(`${product.name} added to your cart.`);
    });
});
