document.addEventListener('DOMContentLoaded', function() {
    // Load translations first
    loadTranslations().then(() => {
        // Initialize components after translations are loaded
        initializeLanguage();
        initializeTerminal();
        
        // Initialize router
        const router = new PortfolioRouter();
        
        // Handle Download CV button
        document.querySelector('.download-cv').addEventListener('click', function(e) {
            e.preventDefault();
            const cvPath = `assets/cv/rakell-cv-${currentLanguage}.pdf`;
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = cvPath;
            link.download = `Rakell_Bandeira_CV_${currentLanguage.toUpperCase()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});