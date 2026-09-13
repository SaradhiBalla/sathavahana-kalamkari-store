"use strict";


/* =========================================================
   HOME PAGE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeNewsletter();

    }
);


/* =========================================================
   NEWSLETTER
========================================================= */

function initializeNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const emailInput =
                document.getElementById(
                    "newsletterEmail"
                );

            if (!emailInput) {
                return;
            }

            const email =
                emailInput.value.trim();

            if (!email) {
                return;
            }

            if (
                window.SathavahanaApp &&
                typeof window.SathavahanaApp.showToast ===
                    "function"
            ) {

                window.SathavahanaApp.showToast(
                    "Thank you for joining the Sathavahana Kalamkari House community."
                );

            }

            form.reset();

        }
    );

}