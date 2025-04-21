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

function handleCommand(command) {
    const contentArea = document.getElementById('contentArea');
    const t = translations[currentLanguage];
    
    switch(command.toLowerCase()) {
        case '.get about rakell':
            contentArea.innerHTML = `
                <div class="about-section">
                    <img src="assets/images/profile.jpg" alt="Rakell">
                    <h2>${t.about_title}</h2>
                    <p>${t.about_text}</p>
                </div>
            `;
            break;
            
        case '.get projects':
            // Load projects list
            const projects = [
                { id: '1', name: 'Real-Time Vehicle Tracker' },
                { id: '2', name: 'E-commerce Platform' },
                { id: '3', name: 'Task Management System' }
            ];
            
            contentArea.innerHTML = `
                <div class="projects-section">
                    <h2>${t.projects_title}</h2>
                    <ul>
                        ${projects.map(project => `
                            <li><a href="#/project/${project.id}">${project.name}</a></li>
                        `).join('')}
                    </ul>
                </div>
            `;
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
            
            // Add form submit handler
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Form submitted! (This is a demo)');
            });
            break;
            
        default:
            contentArea.innerHTML = `<p>${t.command_not_recognized}</p>`;
    }
}