$(document).ready(function () {
    console.log("Bark & Co. Website Initialized.");

    /* =========================================
       1. HEADER SCROLL LOGIC
       ========================================= */
    // Scroll logic removed as per request to keep header transparent


    /* =========================================
       2. GLIDE.JS INITIALIZATION (MOBILE SLIDER PREPARATION)
       ========================================= */
    // Prepared logic to initialize Glide.js for the 'Cómo lo logramos' section 
    // when it has the corresponding HTML wrapper (.glide).
    // It only triggers on mobile screens.
    if ($('.glide-how-we-achieve').length) {
        let glideInst = null;

        function initGlide() {
            if (window.innerWidth < 768 && !glideInst) {
                glideInst = new Glide('.glide-how-we-achieve', {
                    type: 'carousel',
                    perView: 1,
                    gap: 20,
                    autoplay: 3000,
                    hoverpause: true,
                    animationDuration: 800
                }).mount();
            } else if (window.innerWidth >= 768 && glideInst) {
                glideInst.destroy();
                glideInst = null;
            }
        }

        // Initialize on load and listen to window resize
        initGlide();
        $(window).on('resize', initGlide);
    }

    /* =========================================
       3. FORM VALIDATIONS
       ========================================= */
    
    // Booking form is handled natively via API request in BookingForm.astro

    // Contact form is handled natively via API request in Footer.astro
});
