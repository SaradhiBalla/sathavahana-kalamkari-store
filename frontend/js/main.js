"use strict";


/* =========================================================
   APPLICATION INITIALIZATION
========================================================= */
document.addEventListener("DOMContentLoaded", async () => {

    try {

        await loadSharedComponents();

        initializeNavigationRoutes();

        initializeCurrentYear();

        initializeNavbar();

        initializeActiveNavigation();

        initializeStoredCartCount();

    } catch (error) {

        console.error(
            "Failed to initialize application:",
            error
        );

    }

});
function initializeStoredCartCount() {

    try {

        const storedCart =
            localStorage.getItem(
                "sathavahana_cart"
            );

        if (!storedCart) {
            updateCartCount(0);
            return;
        }

        const cart =
            JSON.parse(
                storedCart
            );

        if (
            !Array.isArray(cart)
        ) {

            updateCartCount(0);
            return;

        }

        const totalQuantity =
            cart.reduce(
                (total, item) => {

                    const quantity =
                        Number(
                            item.quantity
                        );

                    return total +
                        (
                            Number.isFinite(quantity)
                                ? Math.max(0, quantity)
                                : 0
                        );

                },
                0
            );

        updateCartCount(
            totalQuantity
        );

    } catch (error) {

        console.error(
            "Unable to initialize cart count:",
            error
        );

        updateCartCount(0);

    }

}


/* =========================================================
   FRONTEND PATH CONFIGURATION
========================================================= */

function getFrontendBasePath() {

    const path =
        window.location.pathname
            .toLowerCase();

    return path.includes("/pages/")
        ? "../"
        : "";

}


/* =========================================================
   LOAD SHARED COMPONENTS
========================================================= */

async function loadSharedComponents() {

    const basePath =
        getFrontendBasePath();

    await Promise.all([
        loadComponent(
            "announcement-container",
            `${basePath}components/announcement.html`
        ),

        loadComponent(
            "navbar-container",
            `${basePath}components/navbar.html`
        ),

        loadComponent(
            "footer-container",
            `${basePath}components/footer.html`
        )
    ]);

}
/* =========================================================
   NAVIGATION ROUTES
========================================================= */

function initializeNavigationRoutes() {

    const basePath =
        getFrontendBasePath();

    const navigationLinks =
        document.querySelectorAll(
            "[data-route]"
        );

    navigationLinks.forEach((link) => {

        const route =
            link.dataset.route;

        if (!route) {
            return;
        }

        link.href =
            `${basePath}${route}`;

    });

}

/* =========================================================
   GENERIC COMPONENT LOADER
========================================================= */

async function loadComponent(
    containerId,
    componentPath
) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch(componentPath);

        if (!response.ok) {

            throw new Error(
                `Unable to load ${componentPath}. `
                + `HTTP status: ${response.status}`
            );

        }

        const html =
            await response.text();

        container.innerHTML = html;

    } catch (error) {

        console.error(
            `Component loading error: ${componentPath}`,
            error
        );

    }

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const currentYearElement =
        document.getElementById("currentYear");

    if (!currentYearElement) {
        return;
    }

    currentYearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {

    const navLinks =
        document.querySelectorAll(
            ".navbar-nav .nav-link"
        );

    if (!navLinks.length) {
        return;
    }

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                const navigation =
                    document.getElementById(
                        "mainNavigation"
                    );

                if (
                    navigation &&
                    navigation.classList.contains("show")
                ) {

                    const navbarToggler =
                        document.querySelector(
                            ".navbar-toggler"
                        );

                    if (navbarToggler) {

                        navbarToggler.click();

                    }

                }

            }
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const currentPage =
        getCurrentPage();

    const navigationLinks =
        document.querySelectorAll(
            "[data-nav]"
        );

    navigationLinks.forEach((link) => {

        const navName =
            link.dataset.nav;

        if (navName === currentPage) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/* =========================================================
   DETERMINE CURRENT PAGE
========================================================= */

function getCurrentPage() {

    const path =
        window.location.pathname
            .toLowerCase();

    if (
        path.endsWith("/")
        || path.endsWith("/index.html")
    ) {

        return "home";

    }

    if (
        path.includes(
            "/about.html"
        )
    ) {

        return "about";

    }

    if (
        path.includes(
            "/products.html"
        )
    ) {

        return "shop";

    }

    if (
        path.includes(
            "/product-details.html"
        )
    ) {

        return "shop";

    }

    if (
        path.includes(
            "/cart.html"
        )
    ) {

        return "cart";

    }

    if (
        path.includes(
            "/wishlist.html"
        )
    ) {

        return "wishlist";

    }

    if (
        path.includes(
            "/login.html"
        )
        ||
        path.includes(
            "/register.html"
        )
        ||
        path.includes(
            "/profile.html"
        )
    ) {

        return "account";

    }

    return "";

}


/* =========================================================
   GLOBAL TOAST
========================================================= */

function showToast(message) {

    const toastElement =
        document.getElementById(
            "globalToast"
        );

    const toastMessage =
        document.getElementById(
            "globalToastMessage"
        );

    if (
        !toastElement
        ||
        !toastMessage
    ) {

        return;

    }

    toastMessage.textContent =
        message;

    const toast =
        bootstrap.Toast.getOrCreateInstance(
            toastElement,
            {
                delay: 3000
            }
        );

    toast.show();

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount(count) {

    const cartCountElements =
        document.querySelectorAll(
            ".nav-cart-count"
        );

    const numericCount =
        Number(count);

    const safeCount =
        Number.isFinite(numericCount)
            ? Math.max(
                0,
                numericCount
            )
            : 0;

    cartCountElements.forEach(
        (element) => {

            element.textContent =
                safeCount > 99
                    ? "99+"
                    : safeCount;

        }
    );

}


/* =========================================================
   GLOBAL APPLICATION API
========================================================= */

window.SathavahanaApp = {

    showToast,

    updateCartCount,

    loadComponent,

    initializeStoredCartCount

};