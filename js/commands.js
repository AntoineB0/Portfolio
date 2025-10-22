import { config, portfolioData, banner, themes, cvData } from './config.js';
import { wrapText, applyTheme, getOSInfo, getBrowserInfo } from './utils.js';

// Variable globale pour stocker l'IP
let userIP = 'Fetching...';

export function setUserIP(ip) {
    userIP = ip;
}

// Crée toutes les commandes du terminal
export function createCommands() {
    return {
        help: function() {
            return `Commandes disponibles:

  [[;#00ff00;]about]          Affiche les informations à propos de moi
  [[;#00ff00;]skills]         Liste mes compétences techniques
  [[;#00ff00;]projects]       Affiche mes projets
  [[;#00ff00;]experience]     Montre mon expérience professionnelle
  [[;#00ff00;]education]      Affiche ma formation
  [[;#00ff00;]cv]             Télécharge mon CV 
  [[;#00ff00;]contact]        Informations de contact
  [[;#00ff00;]social]         Liens vers mes réseaux sociaux
  [[;#00ff00;]theme]          Change le thème du terminal
  [[;#00ff00;]fastfetch]      Affiche les informations système 
  [[;#00ff00;]life]           Jeu de la Vie de Conway 
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
            return cvData;
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
            const computed = getComputedStyle(document.documentElement);
            const currentBg = (computed.getPropertyValue('--terminal-bg') || '').trim().toLowerCase();
            const currentFg = (computed.getPropertyValue('--terminal-fg') || '').trim().toLowerCase();

            const themeName = Object.keys(themes).find(name => {
                return themes[name].bg.toLowerCase() === currentBg && themes[name].fg.toLowerCase() === currentFg;
            }) || (currentBg || currentFg ? 'Custom' : 'classic');

            const osName = getOSInfo();
            const browserName = getBrowserInfo();

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
            return this.fastfetch();
        },

        theme: function(terminal) {
            const themeName = terminal.get_command().split(' ')[1];
            
            if (!themeName) {
                let output = `[[;#44ff44;]THÈMES DISPONIBLES]\n\n`;
                for (const name in themes) {
                    output += `  • ${name}\n`;
                }
                output += `\nUtilisation: theme <nom_du_thème>`;
                return output;
            }

            if (applyTheme(terminal, themeName, themes)) {
                const theme = themes[themeName];
                return `Thème changé en: [[;${theme.fg};]${themeName}]`;
            } else {
                return `[[;#ff4444;]Erreur:] Thème '${themeName}' non trouvé. Tapez 'theme' pour voir la liste.`;
            }
        },

        restart: function(terminal) {
            terminal.clear();
            terminal.pause();
            terminal.set_prompt('');
            
            const systemInfo = getOSInfo();
            
            setTimeout(() => terminal.echo('[[;#888888;]C:\\Users\\visitor>] portfolio.exe'), 100);
            setTimeout(() => terminal.echo(`[[;#00ff00;]User:] Visitor`), 400);
            setTimeout(() => terminal.echo(`[[;#00ff00;]IP:] ${userIP}`), 700);
            setTimeout(() => terminal.echo(`[[;#00ff00;]System:] ${systemInfo}`), 1000);
            setTimeout(() => terminal.echo('[[;#00ff00;]visitor@portfolio:~$] welcome to my portfolio'), 1400);

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
                
                terminal.resume();
            }, 1700);
            
            return '';
        }
    };
}
