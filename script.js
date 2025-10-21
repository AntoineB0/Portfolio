$(document).ready(function() {
    // Animation de fond avec bruit de Perlin en pixel art
    const canvas = document.getElementById('perlin-background');
    const ctx = canvas.getContext('2d');
    
    // Taille des pixels pour l'effet pixel art
    const pixelSize = 10;
    let time = 0;
    
    // Fonction de bruit de Perlin simplifiée
    function noise(x, y, z) {
        // Simple interpolation pour simuler Perlin
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        
        const u = fade(x);
        const v = fade(y);
        const w = fade(z);
        
        const A = p[X] + Y;
        const AA = p[A] + Z;
        const AB = p[A + 1] + Z;
        const B = p[X + 1] + Y;
        const BA = p[B] + Z;
        const BB = p[B + 1] + Z;
        
        return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
                                       grad(p[BA], x - 1, y, z)),
                               lerp(u, grad(p[AB], x, y - 1, z),
                                       grad(p[BB], x - 1, y - 1, z))),
                       lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1),
                                       grad(p[BA + 1], x - 1, y, z - 1)),
                               lerp(u, grad(p[AB + 1], x, y - 1, z - 1),
                                       grad(p[BB + 1], x - 1, y - 1, z - 1))));
    }
    
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(t, a, b) { return a + t * (b - a); }
    function grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    
    // Table de permutation pour Perlin
    const p = new Array(512);
    const permutation = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    
    for (let i = 0; i < 256; i++) {
        p[256 + i] = p[i] = permutation[i];
    }
    
    // Fonction pour obtenir la couleur du thème
    function getThemeColor() {
        const borderColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--terminal-border').trim();
        return borderColor || '#ffffff';
    }
    
    // Convertit hex en RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }
    
    // Redimensionne le canvas
    function resizeCanvas() {
        canvas.width = Math.ceil(window.innerWidth / pixelSize);
        canvas.height = Math.ceil(window.innerHeight / pixelSize);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation
    function animate() {
        const color = hexToRgb(getThemeColor());
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                // Génère du bruit de Perlin
                const value = noise(x * 0.05, y * 0.05, time * 0.5);
                const brightness = (value + 1) * 0.5; // Normalise entre 0 et 1
                
                const index = (y * canvas.width + x) * 4;
                imageData.data[index] = color.r * brightness;
                imageData.data[index + 1] = color.g * brightness;
                imageData.data[index + 2] = color.b * brightness;
                imageData.data[index + 3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        time += 0.01;
        
        requestAnimationFrame(animate);
    }
    
    animate();

    // Fonctionnalité de déplacement de la fenêtre (drag and drop)
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const container = document.getElementById('terminal-container');
    const header = document.getElementById('terminal-header');

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === header || e.target.closest('#terminal-header')) {
            isDragging = true;
            container.style.cursor = 'grabbing';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Récupère les dimensions de la fenêtre et du viewport
            const rect = container.getBoundingClientRect();
            const containerWidth = rect.width;
            const containerHeight = rect.height;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calcule la position initiale centrée du conteneur (sans transform)
            const bodyPadding = 10;
            const initialLeft = (viewportWidth - containerWidth) / 2;
            const initialTop = (viewportHeight - containerHeight) / 2;

            // Calcule les limites min et max
            const minX = -initialLeft + bodyPadding;
            const maxX = viewportWidth - initialLeft - containerWidth - bodyPadding;
            const minY = -initialTop + bodyPadding;
            const maxY = viewportHeight - initialTop - containerHeight - bodyPadding;

            // Applique les limites
            currentX = Math.max(minX, Math.min(currentX, maxX));
            currentY = Math.max(minY, Math.min(currentY, maxY));

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, container);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        container.style.cursor = 'default';
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

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
  [[;#00ff00;]restart]        Redémarre le terminal
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
                matrix: { bg: '#0c0c0c', fg: '#00ff00', border: '#00ff00' },
                hacker: { bg: '#000000', fg: '#00ff00', border: '#00ff00' },
                ocean: { bg: '#001f3f', fg: '#7fdbff', border: '#7fdbff' },
                sunset: { bg: '#1a0a00', fg: '#ff6b35', border: '#ff6b35' },
                purple: { bg: '#1a0033', fg: '#cc00ff', border: '#cc00ff' },
                classic: { bg: '#000000', fg: '#ffffff', border: '#ffffff' }
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
                document.documentElement.style.setProperty('--terminal-border', theme.border);
                return `Thème changé en: [[;${theme.fg};]${themeName}]`;
            } else {
                return `[[;#ff4444;]Erreur:] Thème '${themeName}' non trouvé. Tapez 'theme' pour voir la liste.`;
            }
        },

        restart: function(terminal) {
            terminal.clear();
            terminal.pause();
            terminal.set_prompt('');
            
            const systemInfo = getSystemInfo();
            
            setTimeout(() => {
                terminal.echo('[[;#888888;]C:\\Users\\visitor>] portfolio.exe');
            }, 100);

            setTimeout(() => {
                terminal.echo(`[[;#00ff00;]User:] Visitor`);
            }, 400);

            setTimeout(() => {
                terminal.echo(`[[;#00ff00;]IP:] ${userIP}`);
            }, 700);

            setTimeout(() => {
                terminal.echo(`[[;#00ff00;]System:] ${systemInfo}`);
            }, 1000);

            setTimeout(() => {
                terminal.echo('[[;#00ff00;]visitor@portfolio:~$] welcome to my portfolio');
            }, 1400);

            setTimeout(() => {
                terminal.echo('[[;#888888;]Press Enter...]');
                
                terminal.push(function(command) {
                    terminal.pop();
                    terminal.clear();
                    terminal.echo(banner);
                    terminal.echo('[[;#888888;]💡 Tapez \'help\' pour voir les commandes disponibles]');
                    terminal.set_prompt('[[;#00ff00;]visitor@portfolio][[;#ffffff;]:~$] ');
                }, {
                    prompt: '',
                    name: 'restart'
                });
                
                // Réactive le terminal pour permettre l'entrée
                terminal.resume();
            }, 1700);
            
            return '';
        }
    };

    // Variable globale pour stocker l'IP réelle
    let userIP = 'Fetching...';

    // Fonction pour récupérer la vraie IP de l'utilisateur
    async function fetchRealIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            userIP = data.ip;
            return data.ip;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'IP:', error);
            userIP = 'Unknown';
            return 'Unknown';
        }
    }

    // Récupère l'IP au chargement de la page
    fetchRealIP();

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
            } else if (cmd === 'restart') {
                commands[cmd](term);
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
            const classicTheme = { bg: '#000000', fg: '#ffffff', border: '#ffffff' };
            term.css('--color', classicTheme.fg);
            term.css('--background', classicTheme.bg);
            document.documentElement.style.setProperty('--terminal-bg', classicTheme.bg);
            document.documentElement.style.setProperty('--terminal-fg', classicTheme.fg);
            document.documentElement.style.setProperty('--terminal-border', classicTheme.border);

            // Cache le prompt pendant l'initialisation
            term.set_prompt('');

            // Désactive temporairement le terminal pendant l'animation
            term.pause();

            const systemInfo = getSystemInfo();
            
            // Affiche la séquence de démarrage
            setTimeout(() => {
                term.echo('[[;#888888;]C:\\Users\\visitor>] portfolio.exe');
            }, 100);

            setTimeout(() => {
                term.echo(`[[;#00ff00;]User:] Visitor`);
            }, 400);

            setTimeout(() => {
                term.echo(`[[;#00ff00;]IP:] ${userIP}`);
            }, 700);

            setTimeout(() => {
                term.echo(`[[;#00ff00;]System:] ${systemInfo}`);
            }, 1000);

            setTimeout(() => {
                term.echo('[[;#00ff00;]visitor@portfolio:~$] welcome to my portfolio');
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
