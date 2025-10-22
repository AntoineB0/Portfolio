# 📁 Structure du Projet - Portfolio Terminal

## 🗂️ Organisation des Fichiers

```
Portfolio/
├── index.html              # Point d'entrée HTML
├── style.css               # Styles CSS
├── script.js               # ⚠️ OBSOLÈTE - Remplacé par les modules JS
├── README.md               # Documentation principale
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD GitHub Actions
└── js/                     # 📦 Modules JavaScript (ES6)
    ├── main.js             # Point d'entrée principal
    ├── config.js           # Configuration et données
    ├── utils.js            # Fonctions utilitaires
    ├── commands.js         # Commandes du terminal
    ├── gameOfLife.js       # Jeu de la Vie de Conway
    ├── perlinBackground.js # Animation Perlin Noise
    └── dragAndDrop.js      # Fonctionnalité de déplacement
```

## 📦 Description des Modules

### `js/main.js`
**Point d'entrée principal de l'application**
- Initialise tous les composants
- Configure jQuery Terminal
- Gère la séquence de démarrage
- Easter eggs

### `js/config.js`
**Configuration et données statiques**
- Informations personnelles (`config`)
- Données du portfolio (`portfolioData`)
- Thèmes disponibles (`themes`)
- Banner ASCII art

### `js/utils.js`
**Fonctions utilitaires réutilisables**
- `wrapText()` - Formatage de texte avec retour à la ligne
- `fetchRealIP()` - Récupération de l'IP via API
- `getSystemInfo()` - Détection de l'OS
- `getBrowserInfo()` - Détection du navigateur
- `getOSInfo()` - Informations système détaillées
- `applyTheme()` - Application de thèmes
- `hexToRgb()` - Conversion de couleurs

### `js/commands.js`
**Toutes les commandes du terminal**
- `help`, `about`, `skills`, `projects`
- `experience`, `education`, `contact`
- `cv`, `social`, `banner`
- `fastfetch`, `neofetch`, `theme`
- `restart`

### `js/gameOfLife.js`
**Implémentation du Jeu de la Vie de Conway**
- Logique du jeu (règles, génération)
- Rendu ASCII dans le terminal
- Commandes interactives (pause, restart, quit)

### `js/perlinBackground.js`
**Animation d'arrière-plan avec bruit de Perlin**
- Algorithme de Perlin Noise
- Rendu sur Canvas HTML5
- Style pixel art (10x10px)
- Synchronisation avec les thèmes

### `js/dragAndDrop.js`
**Déplacement de la fenêtre terminal**
- Drag & drop de la fenêtre
- Détection de collision avec les bords
- Limites du viewport

## 🔄 Flux d'Exécution

```
1. index.html charge
   ↓
2. main.js (module ES6) s'initialise
   ↓
3. Imports des modules nécessaires
   ↓
4. Initialisation parallèle:
   - Animation Perlin (perlinBackground.js)
   - Drag & Drop (dragAndDrop.js)
   - Récupération IP (utils.js)
   ↓
5. Création des commandes (commands.js + gameOfLife.js)
   ↓
6. Initialisation jQuery Terminal
   ↓
7. Séquence de boot animation
   ↓
8. Terminal prêt pour l'utilisateur
```

## ⚡ Avantages de la Structure Modulaire

### ✅ Avant (script.js monolithique)
- ❌ ~950 lignes dans un seul fichier
- ❌ Code difficile à maintenir
- ❌ Duplication de code
- ❌ Pas de réutilisabilité
- ❌ Tests difficiles

### ✅ Après (modules ES6)
- ✅ Fichiers de ~100-200 lignes chacun
- ✅ Séparation des responsabilités
- ✅ Code réutilisable
- ✅ Facilite les tests unitaires
- ✅ Import/Export clair
- ✅ Meilleure maintenabilité

## 🚀 Utilisation

### Développement Local
```bash
# Les modules ES6 nécessitent un serveur HTTP
# Option 1: Live Server (VS Code)
# Option 2: Python
python -m http.server 8000

# Option 3: Node.js
npx http-server
```

### Ajouter une Nouvelle Commande

1. **Créer la fonction dans `commands.js`** :
```javascript
nouveauCommande: function() {
    return `Mon output`;
}
```

2. **Ajouter dans help** (même fichier) :
```javascript
[[;#00ff00;]nouvelle]       Description de la commande
```

3. **Optionnel - Gestion spéciale dans `main.js`** :
```javascript
if (cmd === 'nouvelle') {
    commands[cmd](term);
}
```

### Ajouter un Nouveau Module

1. Créer `js/monModule.js`
2. Exporter les fonctions :
```javascript
export function maFonction() {
    // ...
}
```

3. Importer dans `main.js` :
```javascript
import { maFonction } from './monModule.js';
```

## 🔧 Migration depuis l'Ancien Code

Pour utiliser la nouvelle structure, **supprimez ou renommez** `script.js` :

```bash
# Option 1: Supprimer
rm script.js

# Option 2: Garder en backup
mv script.js script.old.js
```

Le fichier `index.html` charge maintenant `js/main.js` en tant que module ES6.

## 📝 Notes Importantes

- **Modules ES6** nécessitent `type="module"` dans le `<script>` tag
- **CORS** : Les modules ne fonctionnent qu'avec un serveur HTTP (pas `file://`)
- **Compatibilité** : Tous les navigateurs modernes supportent les modules ES6
- **Performance** : Les imports sont optimisés par le navigateur

## 🐛 Debugging

### Erreur "Cannot use import outside a module"
➡️ Vérifiez que le tag script a `type="module"`

### Erreur CORS
➡️ Utilisez un serveur HTTP local (Live Server, Python, Node.js)

### Commande ne fonctionne pas
➡️ Vérifiez l'export/import et l'enregistrement dans `commands.js`

## 📊 Métriques

| Métrique | Avant | Après |
|----------|-------|-------|
| Fichiers JS | 1 | 7 modules |
| Lignes/fichier (moy.) | ~950 | ~150 |
| Fonctions dupliquées | 5+ | 0 |
| Maintenabilité | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Testabilité | ⭐ | ⭐⭐⭐⭐⭐ |
