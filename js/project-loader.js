// js/project-loader.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project loader initialized');
    
    // Wait for translations to load
    loadTranslations().then(() => {
        console.log('Translations loaded, starting project load process');
        
        // Get project ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        console.log('Project ID from URL:', projectId);
        
        // Get language from localStorage
        const lang = localStorage.getItem('language') || 'en';
        console.log('Current language:', lang);
        
        if (!projectId) {
            console.error('No project ID specified in URL');
            document.getElementById('projectContent').innerHTML = '<h1>Project not found</h1>';
            return;
        }
        
        // Load project data
        const projectPath = `projects/project-${projectId}.json`;
        console.log('Attempting to load project from:', projectPath);
        
        fetch(projectPath)
            .then(response => {
                console.log('Fetch response status:', response.status);
                console.log('Fetch response OK:', response.ok);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(projectData => {
                console.log('Project data loaded:', projectData);
                const project = projectData[lang];
                
                if (!project) {
                    throw new Error(`No project data for language: ${lang}`);
                }
                
                // Update page title
                document.title = `${project.project} - Rakell's Portfolio`;
                
                // Render project content
                document.getElementById('projectContent').innerHTML = `
                    <div class="project-detail">
                        <h1>${project.project}</h1>
                        <p>${project.shortDescription}</p>
                        
                        ${project.image ? `<img src="${project.image}" alt="${project.project}" class="project-image">` : ''}
                        
                        <div class="stack">
                            ${project.stack.map(tech => `<span class="stack-item">${tech}</span>`).join('')}
                        </div>
                        
                        <a href="${project.button_link}" target="_blank" class="project-button">${project.button_name}</a>
                        
                        <div class="image-details-grid">
                            ${Object.entries(project.imageDetails)
                                .filter(([key]) => key.startsWith('title'))
                                .map(([key, title], index) => {
                                    const num = key.replace('title', '');
                                    const description = project.imageDetails[`description${num}`];
                                    const image = project.imageDetails[`image${num}`];
                                    
                                    return `
                                        <div class="detail-item">
                                            <h3>${title}</h3>
                                            <p>${description}</p>
                                            ${image ? `<img src="${image}" alt="${title}">` : ''}
                                        </div>
                                    `;
                                }).join('')}
                        </div>
                    </div>
                `;
                
                // Update translations
                updateContent();
                
                // Handle language selector
                document.getElementById('navLanguageSelector').value = lang;
                document.getElementById('navLanguageSelector').addEventListener('change', function() {
                    localStorage.setItem('language', this.value);
                    location.reload();
                });
            })
            .catch(error => {
                console.error('Error loading project:', error);
                document.getElementById('projectContent').innerHTML = `
                    <div class="error-message">
                        <h2>Project not found</h2>
                        <p>Sorry, the project you're looking for could not be found.</p>
                        <p>Error: ${error.message}</p>
                        <a href="index.html" class="back-link">Back to portfolio</a>
                    </div>
                `;
            });
    }).catch(error => {
        console.error('Error loading translations:', error);
    });
});

// Simple translations update function
function updateContent() {
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Handle Download CV button
    document.querySelector('.download-cv').addEventListener('click', function(e) {
        e.preventDefault();
        const cvPath = `assets/cv/rakell-cv-${currentLang}.pdf`;
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = `Rakell_Bandeira_CV_${currentLang.toUpperCase()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}