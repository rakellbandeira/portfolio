let currentLanguage = 'en';

function setLanguage() {
    const select = document.getElementById('languageSelect');
    currentLanguage = select.value;
    localStorage.setItem('language', currentLanguage);
    document.getElementById('languagePopup').style.display = 'none';
    updateContent();
}

function updateContent() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    const emailInput = document.querySelector('input[type="email"]');
    const messageInput = document.querySelector('textarea');
    
    if (emailInput) {
        emailInput.placeholder = translations[currentLanguage].email_placeholder;
    }
    
    if (messageInput) {
        messageInput.placeholder = translations[currentLanguage].message_placeholder;
    }
    
    // Update language selector
    document.getElementById('navLanguageSelector').value = currentLanguage;
}

// Initialize language system
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        document.getElementById('languagePopup').style.display = 'none';
        updateContent();
    } else {
        // Show language popup
        document.getElementById('languagePopup').style.display = 'flex';
    }
    
    // Language selector event listener
    document.getElementById('navLanguageSelector').addEventListener('change', function() {
        currentLanguage = this.value;
        localStorage.setItem('language', currentLanguage);
        updateContent();
    });
}