
class PortfolioRouter {
    constructor() {
        this.routes = {
            '/': this.home,
            '/project': this.project
        };
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => this.handleRoute());
    }
    
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const parts = hash.split('/');
        
        if (parts[1] === 'project' && parts[2]) {
            this.project(parts[2]);
        } else {
            this.home();
        }
    }
    
    home() {
        
        document.getElementById('contentArea').innerHTML = '';
        document.body.classList.remove('project-page');
    }
    
    async project(id) {
        try {
            
            const response = await fetch(`projects/project-${id}.json`);
            if (!response.ok) {
                throw new Error(`Project ${id} not found`);
            }
            
            const projectData = await response.json();
            this.renderProject(projectData);
            document.body.classList.add('project-page');
        } catch (error) {
            console.error('Error loading project:', error);
            document.getElementById('contentArea').innerHTML = `
                <div class="error-message">
                    <h2>Project not found</h2>
                    <p>Sorry, the project you're looking for could not be found.</p>
                    <a href="#/" class="back-link">Back to projects</a>
                </div>
            `;
        }
    }
    
    renderProject(data) {
        const lang = localStorage.getItem('language') || 'en';
        const project = data[lang];
        
        const html = `
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
        
        document.getElementById('contentArea').innerHTML = html;
    }
}