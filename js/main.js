import { banner, themes } from './config.js';
import { fetchRealIP, getSystemInfo, applyTheme } from './utils.js';
import { createCommands, setUserIP } from './commands.js';
import { createGameOfLife } from './gameOfLife.js';
import { initPerlinBackground } from './perlinBackground.js';
import { initDragAndDrop } from './dragAndDrop.js';

$(document).ready(async function() {
    // Initialise l'animation d'arrière-plan
    initPerlinBackground();
    
    // Initialise le drag and drop
    initDragAndDrop();
    
    // Récupère l'IP de l'utilisateur
    const userIP = await fetchRealIP();
    setUserIP(userIP);
    
    // Crée toutes les commandes
    const commands = createCommands();
    
    // Ajoute la commande "life" (Jeu de la Vie)
    commands.life = function(terminal) {
        return createGameOfLife(terminal);
    };
    
    // Initialisation du terminal
    const term = $('#terminal').terminal(function(command, term) {
        const cmd = command.toLowerCase().trim().split(' ')[0];
        
        if (cmd === '') {
            return;
        }

        if (commands[cmd]) {
            if (cmd === 'theme') {
                term.echo(commands[cmd](term));
            } else if (cmd === 'restart' || cmd === 'life') {
                commands[cmd](term);
            } else {
                term.echo(commands[cmd]());
            }
        } else {
            term.error(`Commande non reconnue: '${command}'. Tapez 'help' pour voir les commandes disponibles.`);
        }
    }, {
        greetings: false,
        name: 'portfolio_terminal',
        height: '100%',
        prompt: '[[;#00ff00;]visitor@portfolio][[;#ffffff;]:~$] ',
        checkArity: false,
        completion: Object.keys(commands),
        onInit: function(term) {
            // Applique le thème classic par défaut
            applyTheme(term, 'classic', themes);

            // Cache le prompt pendant l'initialisation
            term.set_prompt('');
            term.pause();

            const systemInfo = getSystemInfo();
            
            // Séquence de démarrage
            setTimeout(() => term.echo('[[;#888888;]C:\\Users\\visitor>] portfolio.exe'), 100);
            setTimeout(() => term.echo(`[[;#00ff00;]User:] Visitor`), 400);
            setTimeout(() => term.echo(`[[;#00ff00;]IP:] ${userIP}`), 700);
            setTimeout(() => term.echo(`[[;#00ff00;]System:] ${systemInfo}`), 1000);
            setTimeout(() => term.echo('[[;#00ff00;]visitor@portfolio:~$] welcome to my portfolio'), 1400);

            setTimeout(() => {
                term.echo('[[;#888888;]Press Enter...]');
                
                term.push(function(command) {
                    term.pop();
                    term.clear();
                    term.echo(banner);
                    term.echo('[[;#888888;]💡 Tapez \'help\' pour voir les commandes disponibles]');
                    term.set_prompt('[[;#00ff00;]visitor@portfolio][[;#ffffff;]:~$] ');
                }, {
                    prompt: '',
                    name: 'init'
                });
            }, 1700);
        }
    });

    // Easter eggs
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
