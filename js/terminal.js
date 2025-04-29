// For this solution, update your terminal.js to use standard links
function initializeTerminal() {
    const terminalInput = document.getElementById('terminalInput');
    
    terminalInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            handleCommand(command);
            this.value = '';
        }
    });
}

async function loadProjectsList() {
    try {
        const projects = [];
        
        for (let i = 1; i <= 3; i++) {
            try {
                const response = await fetch(`projects/project-${i}.json`);
                if (response.ok) {
                    const projectData = await response.json();
                    const lang = localStorage.getItem('language') || 'en';
                    projects.push({
                        id: i,
                        name: projectData[lang].project
                    });
                }
            } catch (error) {
                console.log(`Project ${i} not found`);
            }
        }
        
        return projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

async function handleCommand(command) {
    const contentArea = document.getElementById('contentArea');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Check if translations are loaded
    if (typeof translations === 'undefined' || Object.keys(translations).length === 0) {
        contentArea.innerHTML = '<p>Loading translations...</p>';
        return;
    }
    
    // Get translations for current language
    const t = translations[currentLang];
    
    switch(command.toLowerCase()) {
        case '.get about rakell':
            contentArea.innerHTML = `
                <div class="about-section">
                    <img src="assets/images/profile.png" alt="Rakell">
                    <h2>${t.about_title}</h2>
                    <p>${t.about_text}</p>
                </div>
            `;
            break;
            
        case '.get projects':
            // Show loading indicator
            contentArea.innerHTML = '<p>Loading projects...</p>';
            
            const projects = await loadProjectsList();
            
            if (projects.length > 0) {
                contentArea.innerHTML = `
                    <div class="projects-section">
                        <h2>${t.projects_title}</h2>
                        <ul>
                            ${projects.map(project => `
                                <li><a href="project.html?id=${project.id}">${project.name}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            } else {
                contentArea.innerHTML = `
                    <div class="projects-section">
                        <h2>${t.projects_title}</h2>
                        <p>No projects found.</p>
                    </div>
                `;
            }
            break;
            
        case '.get contact':
            contentArea.innerHTML = `
                <div class="contact-section">
                    <h2>${t.contact_title}</h2>
                    <form id="contactForm">
                        <input type="email" placeholder="${t.email_placeholder}" required>
                        <textarea placeholder="${t.message_placeholder}" required></textarea>
                        <button type="submit">${t.send_button}</button>
                    </form>
                </div>
            `;
            
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submitted! (This is a demo)');
            });
            break;
            
        default:
            contentArea.innerHTML = `<p>${t.command_not_recognized}</p>`;
    }
}