$(document).ready(function() {
    // Configuration du portfolio
    const config = {
        name: "Antoine Berteloot",
        title: "Développeur Back-End",
        email: "antoine.berteloot@etu.unilim.fr",
        github: "https://github.com/AntoineB0",
        linkedin: "https://linkedin.com/in/antoine-berteloot",
        location: "Limoges, France"
    };

    // Données du portfolio
    const portfolioData = {
        about: `[[;#ff8903;]Antoine Berteloot - Développeur Back-End]

        Actuellement en BUT Informatique en alternance, je développe mes compétences en tant que Développeur Back-End
chez Lacaux Frères.
Au cours de mon parcours, j’ai effectué un stage à l’institut de recherche XLIM, où j’ai conçu une interface web
pour visualiser l’utilisation de la forge logicielle GitLab. J’ai également participé à un projet académique en partenariat
avec l'entreprise Legrand, en développant une application d’atelier selon les méthodologies AGILE, renforçant ainsi ma capacité à
travailler en équipe et à livrer des solutions adaptées aux besoins industriels.

📍 Localisation: ${config.location}
📧 Email: ${config.email}
🔗 GitHub: ${config.github}
💼 LinkedIn: ${config.linkedin}`,

        skills: {
    "Langages": ["Java", "Kotlin", "Python", "C++", "JavaScript", "PHP", "HTML/CSS", "SQL"],
    "Frontend": ["Vue.js", "JavaFX", "Chart.js", "Figma"],
    "Backend": ["Node.js", "Express", "Django"],
    "Base de données": ["SQL Server", "PostgreSQL", "MongoDB"],
    "Outils": ["Git", "GitLab", "Docker", "VS Code", "Postman", "Agile/Scrum"]
    },

       projects: [
    {
        name: "Projet - Visualisation GitLab XLIM",
        description: "Développement d’une interface web open source d’analyse statistique de l’utilisation de la forge logicielle GitLab du laboratoire XLIM.",
        tech: ["Python", "JavaScript", "Django", "Chart.js", "GitLab"]
    },
    {
        name: "Projet Universitaire - Application POC Legrand",
        description: "Conception d’une application d’atelier POC pour l’entreprise Legrand en méthode Agile.",
        tech: ["Vue.js", "Node.js", "SQL Server", "Figma"]
    },
    {
        name: "Jeu de Scrabble en Java",
        description: "Développement d’un jeu de Scrabble complet en Java avec interface graphique JavaFX.",
        tech: ["Java", "JavaFX"]
    },
    {
        name: "Simulation Réseau CHU",
        description: "Simulation d’un déploiement réseau avec configuration de pare-feux et routage.",
        tech: ["Katara", "Réseaux", "Sécurité"]
    },
    {
        name: "Portfolio Terminal",
        description: "Portfolio interactif en style terminal web.",
        tech: ["jQuery Terminal", "JavaScript", "CSS"]
    }],


        experience: [
    {
        title: "Developpeur Back-end",
        company: "Lacaux Frères",
        period: "2025-2026",
        description: ""
    },
    {
        title: "Développeur Stagiaire",
        company: "Institut de Recherche XLIM",
        period: "2025 (12 semaines)",
        description: "Conception et développement d’une interface web d’analyse statistique de l’activité de la forge logicielle GitLab utilisée par 900+ dépôts du laboratoire. L’outil répondait au besoin critique de visualiser l’évolution des métriques (commits, projets, utilisateurs) pour optimiser l’accompagnement des chercheurs."
    }
],

        education: [
    {
        degree: "Bachelor Universitaire de Technologie (BUT) Informatique",
        school: "IUT de Limoges, France",
        year: "2023 - 2026"
    },
    {
        degree: "Diplôme Étudiant Entrepreneur (D2E)",
        school: "Université de Limoges, France",
        year: "2023 - 2024"
    },
    {
        degree: "Baccalauréat Général - Spécialités Mathématiques et NSI",
        school: "Lycée à Limoges, France",
        year: "2020 - 2023"
    }
]
    };

    // ASCII Art pour le banner
    const banner = `
 ____               __       ___       ___                  
/\\  _\`\\            /\\ \\__  /'\___\\     /\\_ \\    __           
\\ \\ \\L\\ \\___   _ __\\ \\ ,_\\/\\ \\__/  ___\\//\\ \\  /\\_\\    ___   
 \\ \\ ,__/ __\`\\/\\\`'__\\ \\ \\/\\ \\ ,__\\/ __\`\\\\ \\ \\ \\/\\ \\  / __\`\\ 
  \\ \\ \\/\\ \\L\\ \\ \\ \\/ \\ \\ \\_\\ \\ \\_/\\ \\L\\ \\\\_\\ \\_\\ \\ \\/\\ \\L\\ \\
   \\ \\_\\ \\____/\\ \\_\\  \\ \\__\\\\ \\_\\\\ \\____//\\____\\\\ \\_\\ \\____/
    \\/_/\\/___/  \\/_/   \\/__/ \\/_/ \\/___/ \\/____/ \\/_/\\/___/ 

Bienvenue sur le portfolio d'Antoine Berteloot
Tapez 'help' pour voir les commandes disponibles.
`;

    // Fonction utilitaire pour formater le texte avec retour à la ligne automatique
    function wrapText(text, maxLength = 100, indent = '   ') {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length <= maxLength) {
                currentLine += (currentLine ? ' ' : '') + word;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        });
        
        if (currentLine) lines.push(currentLine);
        
        return lines.map((line, index) => index === 0 ? line : indent + line).join('\n');
    }

    // Commandes disponibles
    const commands = {
        help: function() {
            return `Commandes disponibles:

  [[;#00ff00;]about]          Affiche les informations à propos de moi
  [[;#00ff00;]skills]         Liste mes compétences techniques
  [[;#00ff00;]projects]       Affiche mes projets
  [[;#00ff00;]experience]     Montre mon expérience professionnelle
  [[;#00ff00;]education]      Affiche ma formation
  [[;#00ff00;]contact]        Informations de contact
  [[;#00ff00;]fastfetch]      Affiche les informations système 
  [[;#00ff00;]cv]             Télécharge mon CV (PDF)
  [[;#00ff00;]social]         Liens vers mes réseaux sociaux
  [[;#00ff00;]theme]          Change le thème du terminal
  [[;#00ff00;]clear]          Efface l'écran
  [[;#00ff00;]help]           Affiche cette aide
  [[;#00ff00;]banner]         Affiche le banner de bienvenue

Astuce: Utilisez TAB pour l'autocomplétion des commandes.`;
        },

        about: function() {
            return `[[;#44ff44;]À PROPOS]

${portfolioData.about}`;
        },

        skills: function() {
            let output = `[[;#44ff44;]COMPÉTENCES TECHNIQUES]\n\n`;
            
            for (const [category, skills] of Object.entries(portfolioData.skills)) {
                output += `[[b;#ffaa00;]${category}:]\n`;
                skills.forEach(skill => {
                    output += `  • ${skill}\n`;
                });
                output += '\n';
            }
            
            return output;
        },

        projects: function() {
            let output = `[[;#44ff44;]PROJETS]\n\n`;
            
            portfolioData.projects.forEach((project, index) => {
                output += `[[b;#00aaff;]${index + 1}. ${project.name}]\n`;
                output += `   ${wrapText(project.description, 75, '   ')}\n`;
                output += `   [[;#888888;]Technologies:] ${project.tech.join(', ')}\n`;
                if (project.link) {
                    output += `   [[;#888888;]Lien:] [[!;;;;${project.link}]${project.link}]\n`;
                }
                output += '\n';
            });
            
            return output;
        },

        experience: function() {
            let output = `[[;#44ff44;]EXPÉRIENCE PROFESSIONNELLE]\n\n`;
            
            portfolioData.experience.forEach(exp => {
                output += `[[b;#00aaff;]${exp.title}] - ${exp.company}\n`;
                output += `[[;#888888;]${exp.period}]\n`;
                if (exp.description) {
                    output += `${wrapText(exp.description, 75, '')}\n`;
                }
                output += '\n';
            });
            
            return output;
        },

        education: function() {
            let output = `[[;#44ff44;]FORMATION]\n\n`;
            
            portfolioData.education.forEach(edu => {
                output += `[[b;#00aaff;]${edu.degree}]\n`;
                output += `${edu.school} - ${edu.year}\n\n`;
            });
            
            return output;
        },

        contact: function() {
            return `[[;#44ff44;]CONTACT]

📧 Email: [[!;;;;mailto:${config.email}]${config.email}]
📱 GitHub: [[!;;;;${config.github}]${config.github}]
💼 LinkedIn: [[!;;;;${config.linkedin}]${config.linkedin}]
📍 Localisation: ${config.location}

N'hésitez pas à me contacter pour toute opportunité ou collaboration !`;
        },

        cv: function() {
            return `[[;#ffaa00;]Téléchargement du CV...]

Pour ajouter votre CV, placez un fichier 'cv.pdf' dans le dossier du projet.
Vous pouvez ensuite créer un lien de téléchargement.

[[;#888888;]Astuce: Créez votre CV et ajoutez-le au projet !]`;
        },

        social: function() {
            return `[[;#44ff44;]RÉSEAUX SOCIAUX]

🔗 GitHub: [[!;;;;${config.github}]${config.github}]
💼 LinkedIn: [[!;;;;${config.linkedin}]${config.linkedin}]

Suivez-moi pour voir mes derniers projets et articles !`;
        },

        banner: function() {
            return `[[;#44ff44;]${banner}]`;
        },

        fastfetch: function() {
            const currentDate = new Date();
            const uptimeDays = Math.floor((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
            
            // Détecte le thème courant
            const themes = {
                matrix: { bg: '#0c0c0c', fg: '#00ff00' },
                hacker: { bg: '#000000', fg: '#00ff00' },
                ocean: { bg: '#001f3f', fg: '#7fdbff' },
                sunset: { bg: '#1a0a00', fg: '#ff6b35' },
                purple: { bg: '#1a0033', fg: '#cc00ff' },
                classic: { bg: '#000000', fg: '#ffffff' }
            };

            const computed = getComputedStyle(document.documentElement);
            const currentBg = (computed.getPropertyValue('--terminal-bg') || '').trim().toLowerCase();
            const currentFg = (computed.getPropertyValue('--terminal-fg') || '').trim().toLowerCase();

            const themeName = Object.keys(themes).find(name => {
                return themes[name].bg.toLowerCase() === currentBg && themes[name].fg.toLowerCase() === currentFg;
            }) || (currentBg || currentFg ? 'Custom' : 'classic');

            // Détecte l'OS réel
            let osName = 'Unknown OS';
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const platform = navigator.platform || '';
            
            if (navigator.userAgentData && navigator.userAgentData.platform) {
                // API moderne (Chrome 90+, Edge 90+)
                const platformData = navigator.userAgentData.platform;
                if (platformData.includes('Win')) osName = 'Windows';
                else if (platformData.includes('Mac')) osName = 'macOS';
                else if (platformData.includes('Linux')) osName = 'Linux';
                else osName = platformData;
            } else {
                // Fallback avec userAgent
                if (platform.indexOf('Win') !== -1 || userAgent.indexOf('Windows') !== -1) {
                    if (userAgent.indexOf('Windows NT 10.0') !== -1) osName = 'Windows 10/11';
                    else if (userAgent.indexOf('Windows NT 6.3') !== -1) osName = 'Windows 8.1';
                    else if (userAgent.indexOf('Windows NT 6.2') !== -1) osName = 'Windows 8';
                    else if (userAgent.indexOf('Windows NT 6.1') !== -1) osName = 'Windows 7';
                    else osName = 'Windows';
                } else if (platform.indexOf('Mac') !== -1 || userAgent.indexOf('Mac') !== -1) {
                    osName = 'macOS';
                } else if (platform.indexOf('Linux') !== -1 || userAgent.indexOf('Linux') !== -1) {
                    if (userAgent.indexOf('Android') !== -1) osName = 'Android';
                    else osName = 'Linux';
                } else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
                    osName = 'iOS';
                }
            }

            // Détecte le navigateur (avec nettoyage des valeurs étranges comme "Not?A_Brand" ou "Not=A?Brand")
            let browserName = 'Unknown Browser';
            let browserVersion = '';

            if (navigator.userAgentData && navigator.userAgentData.brands) {
                const brands = navigator.userAgentData.brands;
                const normalize = (s) => (s || '').toString().replace(/[^0-9A-Za-z.\s]/g, ' ').replace(/\s+/g, ' ').trim();
                const isNotABrand = (s) => /^Not\s*A\s*Brand$/i.test(normalize(s));

                // Choisit la première marque utile (évite Chromium et les valeurs "Not A Brand")
                const primary = brands.find(b => {
                    const nb = normalize(b.brand);
                    return nb && nb.toLowerCase() !== 'chromium' && !isNotABrand(b.brand);
                }) || brands[brands.length - 1];

                browserName = normalize(primary.brand) || 'Unknown';
                browserVersion = primary.version || '';
            } else {
                if (/Edg\/([\d.]+)/.test(userAgent)) {
                    browserName = 'Microsoft Edge';
                    browserVersion = RegExp.$1;
                } else if (/OPR\/([\d.]+)/.test(userAgent)) {
                    browserName = 'Opera';
                    browserVersion = RegExp.$1;
                } else if (/Chrome\/([\d.]+)/.test(userAgent)) {
                    browserName = 'Chrome';
                    browserVersion = RegExp.$1;
                } else if (/Firefox\/([\d.]+)/.test(userAgent)) {
                    browserName = 'Firefox';
                    browserVersion = RegExp.$1;
                } else if (/Version\/([\d.]+).*Safari/.test(userAgent)) {
                    browserName = 'Safari';
                    browserVersion = RegExp.$1;
                }
            }

            const browserDisplay = browserVersion ? `${browserName} ${browserVersion}` : browserName;

            return `
[[;#00aaff;] --%%%#--------}%%%-- ]                [[;#ffaa00;]${config.name}][[;#888888;]@][[;#ffaa00;]portfolio]
[[;#00aaff;] --%%%%%%%~-%%%%%%%-- ]                [[;#888888;]─────────────────────────────]
[[;#00aaff;] --%%%<%%%%%%%--%%%-- ]                [[;#00ff00;]OS:]        ${osName}
[[;#00aaff;] --%%%--%%%%%%-+%%%-- ]                [[;#00ff00;]Host:]      ${browserName}
[[;#00aaff;] --%%%%+%%%%%%%%%%%-- ]                [[;#00ff00;]Kernel:]    jQuery Terminal 2.37.0
[[;#00aaff;] --%%%--%%%%%%--%%%-- ]                [[;#00ff00;]Uptime:]    ${uptimeDays} days 
[[;#00aaff;] --%%%--%%%%%%--%%%-- ]                [[;#00ff00;]Shell:]     AB Shell
[[;#00aaff;] --}%{--%%%%%%%%%#--- ]                [[;#00ff00;]Theme:]     ${themeName}
[[;#00aaff;] -------%%%%%%(------ ]                 
                                      

                              [[;#ff0000;]██][[;#00ff00;]██][[;#ffaa00;]██][[;#0000ff;]██][[;#ff00ff;]██][[;#00ffff;]██][[;#ffffff;]██][[;#888888;]██]
`;
        },

        neofetch: function() {
            return commands.fastfetch();
        },

        theme: function(terminal) {
            const themes = {
                matrix: { bg: '#0c0c0c', fg: '#00ff00' },
                hacker: { bg: '#000000', fg: '#00ff00' },
                ocean: { bg: '#001f3f', fg: '#7fdbff' },
                sunset: { bg: '#1a0a00', fg: '#ff6b35' },
                purple: { bg: '#1a0033', fg: '#cc00ff' },
                classic: { bg: '#000000', fg: '#ffffff' }
            };

            const themeName = terminal.get_command().split(' ')[1];
            
            if (!themeName) {
                let output = `[[;#44ff44;]THÈMES DISPONIBLES]\n\n`;
                for (const name in themes) {
                    output += `  • ${name}\n`;
                }
                output += `\nUtilisation: theme <nom_du_thème>`;
                return output;
            }

            if (themes[themeName]) {
                const theme = themes[themeName];
                terminal.css('--color', theme.fg);
                terminal.css('--background', theme.bg);
                document.documentElement.style.setProperty('--terminal-bg', theme.bg);
                document.documentElement.style.setProperty('--terminal-fg', theme.fg);
                return `Thème changé en: [[;${theme.fg};]${themeName}]`;
            } else {
                return `[[;#ff4444;]Erreur:] Thème '${themeName}' non trouvé. Tapez 'theme' pour voir la liste.`;
            }
        }
    };

    // Fonction pour obtenir une fausse IP aléatoire
    function getRandomIP() {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }

    // Détecte l'OS pour l'affichage initial
    function getSystemInfo() {
        const userAgent = navigator.userAgent || '';
        const platform = navigator.platform || '';
        
        let osName = 'Unknown OS';
        if (navigator.userAgentData && navigator.userAgentData.platform) {
            const platformData = navigator.userAgentData.platform;
            if (platformData.includes('Win')) osName = 'Windows 10';
            else if (platformData.includes('Mac')) osName = 'macOS';
            else if (platformData.includes('Linux')) osName = 'Linux';
            else osName = platformData;
        } else {
            if (platform.indexOf('Win') !== -1 || userAgent.indexOf('Windows') !== -1) {
                if (userAgent.indexOf('Windows NT 10.0') !== -1) osName = 'Windows 10';
                else osName = 'Windows';
            } else if (platform.indexOf('Mac') !== -1) {
                osName = 'macOS';
            } else if (platform.indexOf('Linux') !== -1) {
                osName = 'Linux';
            }
        }
        return osName;
    }

    // Initialisation du terminal
    const term = $('#terminal').terminal(function(command, term) {
        const cmd = command.toLowerCase().trim().split(' ')[0];
        
        if (cmd === '') {
            return;
        }

        if (commands[cmd]) {
            if (cmd === 'theme') {
                term.echo(commands[cmd](term));
            } else {
                term.echo(commands[cmd]());
            }
        } else {
            term.error(`Commande non reconnue: '${command}'. Tapez 'help' pour voir les commandes disponibles.`);
        }
    }, {
        greetings: false, // Désactive le greeting par défaut
        name: 'portfolio_terminal',
        height: '100%',
        prompt: '[[;#00ff00;]visitor@portfolio][[;#ffffff;]:~$] ',
        checkArity: false,
        completion: Object.keys(commands),
        onInit: function(term) {
            // Applique le thème classic
            const classicTheme = { bg: '#000000', fg: '#ffffff' };
            term.css('--color', classicTheme.fg);
            term.css('--background', classicTheme.bg);
            document.documentElement.style.setProperty('--terminal-bg', classicTheme.bg);
            document.documentElement.style.setProperty('--terminal-fg', classicTheme.fg);

            // Cache le prompt pendant l'initialisation
            term.set_prompt('');

            // Désactive temporairement le terminal pendant l'animation
            term.pause();

            const fakeIP = getRandomIP();
            const systemInfo = getSystemInfo();
            let waitingForEnter = false;
            
            // Affiche la séquence de démarrage
            setTimeout(() => {
                term.echo('[[;#888888;]C:\\Users\\visitor>] portfolio.exe');
            }, 100);

            setTimeout(() => {
                term.echo(`[[;#00ff00;]User:] Visitor`);
            }, 400);

            setTimeout(() => {
                term.echo(`[[;#00ff00;]IP:] ${fakeIP}`);
            }, 700);

            setTimeout(() => {
                term.echo(`[[;#00ff00;]System:] ${systemInfo}`);
            }, 1000);

            setTimeout(() => {
                term.echo('[[;#00ff00;]guest@portfolio.terminal:~$] welcome to my portfolio');
            }, 1400);

            setTimeout(() => {
                term.echo('[[;#888888;]Press Enter...]');
                
                // Crée un mode temporaire qui attend juste Enter
                term.push(function(command) {
                    // Cette fonction est appelée quand on appuie sur Enter
                    // On sort immédiatement de ce mode
                    term.pop();
                    
                    // Clear le terminal et affiche le banner
                    term.clear();
                    term.echo(banner);
                    term.echo('[[;#888888;]💡 Tapez \'help\' pour voir les commandes disponibles]');
                    
                    // Réactive le prompt
                    term.set_prompt('[[;#00ff00;]visitor@portfolio][[;#ffffff;]:~$] ');
                }, {
                    prompt: '', // Pas de prompt pendant l'attente
                    name: 'init'
                });
            }, 1700);
        }
    });

    // Easter egg - commande secrète
    term.on('keydown', function(e) {
        // Détecte la séquence Konami Code (peut être adapté)
        // Pour simplifier, on peut ajouter une commande cachée
    });

    // Ajouter des commandes cachées amusantes
    term.on('keydown', function(e) {
        const input = term.get_command();
        if (input === 'sudo rm -rf /') {
            e.preventDefault();
            term.set_command('');
            term.error("Nice try! But you can't delete my portfolio");
            return false;
        }
    });
});
