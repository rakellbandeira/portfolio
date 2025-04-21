
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
        // Reset to default view
        document.getElementById('contentArea').innerHTML = '';
        document.body.classList.remove('project-page');
    }
    
    async project(id) {
        try {
            // For demo purposes, using hardcoded data
            // In real implementation, would fetch from projects/project-${id}.json
            const projectData = {
                "pt": {
                    "project": "Real-Time Vehicle Tracker v1.0.",
                    "shortDescription": "Aplicação web que mostra as localizações da frota em tempo real",
                    "image": "assets/images/projects/vehicle-tracker.jpg",
                    "subTitle": "Uma solução moderna para rastreamento de veículos",
                    "stack": [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "Google Maps API"
                    ],
                    "button_name": "VISITE O WEBSITE",
                    "button_link": "https://example.com",
                    "imageDetails": {
                        "title1": "O desafio",
                        "description1": "O cliente procurava um sistema de acompanhamento para sua pequena empresa, porém as soluções existentes no mercado eram extremamente caras.",
                        "image1": "assets/images/projects/challenge.jpg",
                        "title2": "Abordagem",
                        "description2": "Utilizei HTML, CSS e JavaScript para criar uma experiência amigável e responsiva.",
                        "image2": "assets/images/projects/approach.jpg",
                        "title3": "Resultados",
                        "description3": "O sistema reduziu os custos operacionais em 40% e melhorou a eficiência da frota.",
                        "image3": "assets/images/projects/results.jpg"
                    }
                },
                "en": {
                    "project": "Real-Time Vehicle Tracker v1.0.",
                    "shortDescription": "A web app that displays fleet's locations in real-time",
                    "image": "assets/images/projects/vehicle-tracker.jpg",
                    "subTitle": "A modern solution for vehicle tracking",
                    "stack": [
                        "HTML",
                        "CSS",
                        "JavaScript",
                        "Google Maps API"
                    ],
                    "button_name": "VISIT WEBSITE",
                    "button_link": "https://example.com",
                    "imageDetails": {
                        "title1": "The Challenge",
                        "description1": "The client was seeking a tracking system for his small business but existing solutions were extremely expensive.",
                        "image1": "assets/images/projects/challenge.jpg",
                        "title2": "Approach",
                        "description2": "I used HTML, CSS and JavaScript to create user-friendly and responsive experience.",
                        "image2": "assets/images/projects/approach.jpg",
                        "title3": "Results",
                        "description3": "The system reduced operational costs by 40% and improved fleet efficiency.",
                        "image3": "assets/images/projects/results.jpg"
                    }
                }
            };
            
            this.renderProject(projectData);
            document.body.classList.add('project-page');
        } catch (error) {
            console.error('Error loading project:', error);
            document.getElementById('contentArea').innerHTML = '<p>Error loading project</p>';
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