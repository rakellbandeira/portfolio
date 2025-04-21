
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLanguage();
    initializeTerminal();
    
    // Initialize router
    const router = new PortfolioRouter();
    
    // Handle Download CV button
    document.querySelector('.download-cv').addEventListener('click', function(e) {
        e.preventDefault();
        // For demo, just show alert
        alert('CV download would happen here. In real implementation, link this to your CV file.');
    });
});