
let translations = {};

function loadTranslations() {
    return fetch('../data/translations.json')  // Updated path to go up one directory level
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            translations = data;
            console.log('Translations loaded successfully');
            return translations;
        })
        .catch(error => {
            console.error('Error loading translations:', error);
            // Fallback translations if loading fails
            translations = {
                "en": {
                    "greeting": "Hi, I'm Rakell, a software development student",
                    "terminal_prompt": "Type what you wish to see in the console:",
                    "welcome": "Welcome to my personal application v.1.0",
                    "about_command": "Type '.get about Rakell' to get to know more about me.",
                    "projects_command": "Type '.get projects' to see my past projects.",
                    "contact_command": "Type '.get contact' to email me something.",
                    "download_cv": "Download CV",
                    "copyright": "© 2025 — Rakell Bandeira",
                    "about_title": "About Me",
                    "about_text": "I'm Rakell, a passionate software development student focused on creating intuitive and powerful web applications.",
                    "projects_title": "My Projects",
                    "contact_title": "Contact Me",
                    "email_placeholder": "Your Email",
                    "message_placeholder": "How can I help you?",
                    "send_button": "Send",
                    "command_not_recognized": "Command not recognized. Please try again.",
                    "language_choose": "Choose your language",
                    "continue_button": "Continue"
                },
                "pt": {
                    "greeting": "Olá, sou Rakell, um estudante de desenvolvimento de software",
                    "terminal_prompt": "Digite o que deseja ver no console:",
                    "welcome": "Bem-vindo à minha aplicação pessoal v.1.0",
                    "about_command": "Digite '.get about Rakell' para saber mais sobre mim.",
                    "projects_command": "Digite '.get projects' para ver meus projetos anteriores.",
                    "contact_command": "Digite '.get contact' para me enviar um email.",
                    "download_cv": "Baixar CV",
                    "copyright": "© 2025 — Rakell Bandeira",
                    "about_title": "Sobre Mim",
                    "about_text": "Sou Rakell, um estudante de desenvolvimento de software apaixonado, focado em criar aplicações web intuitivas e poderosas.",
                    "projects_title": "Meus Projetos",
                    "contact_title": "Entre em Contato",
                    "email_placeholder": "Seu Email",
                    "message_placeholder": "Como posso ajudar?",
                    "send_button": "Enviar",
                    "command_not_recognized": "Comando não reconhecido. Por favor, tente novamente.",
                    "language_choose": "Escolha seu idioma",
                    "continue_button": "Continuar"
                }
            };
            return translations;
        });
}