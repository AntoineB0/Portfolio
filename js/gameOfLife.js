// Jeu de la Vie de Conway
export function createGameOfLife(terminal) {
    terminal.clear();
    
    // Configuration du jeu
    const WIDTH = 60;
    const HEIGHT = 25;
    let generation = 0;
    let grid = [];
    let running = true;
    let isPaused = false;
    let gameInterval;
    
    // Initialiser la grille avec des cellules aléatoires
    const initGrid = function() {
        grid = [];
        for (let y = 0; y < HEIGHT; y++) {
            grid[y] = [];
            for (let x = 0; x < WIDTH; x++) {
                grid[y][x] = Math.random() < 0.3; // 30% de chances d'être vivante
            }
        }
    };
    
    // Compter les voisins vivants
    const countNeighbors = function(x, y) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                
                const nx = (x + dx + WIDTH) % WIDTH;
                const ny = (y + dy + HEIGHT) % HEIGHT;
                
                if (grid[ny][nx]) count++;
            }
        }
        return count;
    };
    
    // Calculer la prochaine génération
    const nextGeneration = function() {
        const newGrid = [];
        
        for (let y = 0; y < HEIGHT; y++) {
            newGrid[y] = [];
            for (let x = 0; x < WIDTH; x++) {
                const neighbors = countNeighbors(x, y);
                const alive = grid[y][x];
                
                // Règles du Jeu de la Vie
                if (alive) {
                    newGrid[y][x] = neighbors === 2 || neighbors === 3;
                } else {
                    newGrid[y][x] = neighbors === 3;
                }
            }
        }
        
        grid = newGrid;
        generation++;
    };
    
    // Dessiner la grille
    const draw = function() {
        let output = '╔' + '═'.repeat(WIDTH) + '╗\n';
        
        for (let y = 0; y < HEIGHT; y++) {
            output += '║';
            for (let x = 0; x < WIDTH; x++) {
                if (grid[y][x]) {
                    output += '[[;#00ff00;]█]';
                } else {
                    output += ' ';
                }
            }
            output += '║\n';
        }
        
        output += '╚' + '═'.repeat(WIDTH) + '╝\n';
        const status = isPaused ? '[[;#ffaa00;]PAUSE]' : '[[;#00ff00;]EN COURS]';
        output += `[[;#00ff00;]Génération:] ${generation}  |  Status: ${status}\n`;
        output += `[[;#888888;]Commandes: r=réinitialiser | p=pause/play | q=quitter]`;
        
        terminal.clear();
        terminal.echo(output);
    };
    
    // Gérer la fin du jeu
    const endGame = function() {
        running = false;
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        
        terminal.pop();
        terminal.clear();
        terminal.echo('');
        terminal.echo('  [[;#888888;]Simulation terminée]');
        terminal.echo('');
        terminal.echo(`  [[;#00ff00;]Générations simulées:] ${generation}`);
        terminal.echo('');
        terminal.set_prompt('[[;#00ff00;]visitor@portfolio][[;#ffffff;]:~$] ');
    };
    
    // Mode interactif avec barre de texte
    terminal.push(function(command) {
        const cmd = command.toLowerCase().trim();
        
        if (!running) return;
        
        if (cmd === 'q' || cmd === 'quit' || cmd === 'exit') {
            endGame();
        } else if (cmd === 'r' || cmd === 'restart' || cmd === 'reset') {
            generation = 0;
            initGrid();
            draw();
        } else if (cmd === 'p' || cmd === 'pause' || cmd === 'play') {
            if (gameInterval) {
                clearInterval(gameInterval);
                gameInterval = null;
                isPaused = true;
            } else {
                isPaused = false;
                gameInterval = setInterval(function() {
                    nextGeneration();
                    draw();
                }, 200);
            }
            draw();
        } else if (cmd === 'h' || cmd === 'help') {
            terminal.echo('[[;#00ff00;]Commandes disponibles:]');
            terminal.echo('  [[;#ffaa00;]r/restart/reset] - Réinitialiser avec une nouvelle grille');
            terminal.echo('  [[;#ffaa00;]p/pause/play] - Mettre en pause ou reprendre');
            terminal.echo('  [[;#ffaa00;]q/quit/exit] - Quitter la simulation');
            terminal.echo('  [[;#ffaa00;]h/help] - Afficher cette aide');
        } else if (cmd !== '') {
            terminal.error(`Commande inconnue: '${cmd}'. Tapez 'h' pour l'aide.`);
        }
    }, {
        prompt: '[[;#00ff00;]life>] ',
        name: 'game_of_life'
    });
    
    // Démarrer le jeu
    initGrid();
    draw();
    gameInterval = setInterval(function() {
        nextGeneration();
        draw();
    }, 200);
    
    return '';
}
