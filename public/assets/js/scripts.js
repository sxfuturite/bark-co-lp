document.addEventListener('DOMContentLoaded', function () {
    console.log("Bark & Co. Website Initialized.");

    /* =========================================
       1. FORM VALIDATIONS
       ========================================= */
    // Booking form is handled natively via API request in BookingForm.astro
    // Contact form is handled natively via API request in Footer.astro

    /* =========================================
       2. CONTROL DE PALABRAS HUÉRFANAS (ORPHAN CONTROL)
       ========================================= */
    function preventOrphans() {
        const words = ['a', 'para', 'y', 'en', 'de', 'con', 'tu', 'tus', 'te', 'o', 'u', 'e', 'del', 'al'];
        const regex = new RegExp('\\b(' + words.join('|') + ')\\b\\s+', 'gi');

        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.textContent;
                
                // 1. Reemplazar espacios regulares tras palabras cortas
                let newText = text.replace(regex, '$1\u00A0');
                
                // 2. Controlar la última palabra (evitar viudas/huérfanas al final del párrafo)
                const wordsArray = newText.trim().split(/\s+/);
                if (wordsArray.length > 2) {
                    const lastSpaceIndex = newText.lastIndexOf(' ');
                    if (lastSpaceIndex !== -1) {
                        newText = newText.substring(0, lastSpaceIndex) + '\u00A0' + newText.substring(lastSpaceIndex + 1);
                    }
                }
                
                if (node.textContent !== newText) {
                    node.textContent = newText;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tag = node.tagName.toLowerCase();
                if (tag !== 'script' && tag !== 'style' && tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        processNode(node.childNodes[i]);
                    }
                }
            }
        }

        processNode(document.body);
    }

    preventOrphans();
});
