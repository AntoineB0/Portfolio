# Portfolio Terminal 💻

Un portfolio interactif dans le style terminal créé avec jQuery Terminal.

## 🚀 Fonctionnalités

- Interface terminal interactive
- Commandes personnalisées pour explorer le portfolio
- Thèmes multiples (matrix, ocean, sunset, etc.)
- Autocomplétion des commandes (TAB)
- Design responsive
- Animations et effets visuels

## 📋 Commandes disponibles

- `help` - Affiche toutes les commandes disponibles
- `about` - Informations à propos de moi
- `skills` - Mes compétences techniques
- `projects` - Liste de mes projets
- `experience` - Mon expérience professionnelle
- `education` - Ma formation
- `contact` - Informations de contact
- `social` - Liens vers mes réseaux sociaux
- `theme <nom>` - Change le thème du terminal
- `clear` - Efface l'écran
- `banner` - Affiche le banner de bienvenue

## 🛠️ Installation

1. Clonez ce repository :
```bash
git clone https://github.com/AntoineB0/Portfolio.git
cd Portfolio
```

2. Ouvrez `index.html` dans votre navigateur

Ou utilisez un serveur local :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server
```

3. Ouvrez votre navigateur à `http://localhost:8000`

## ⚙️ Personnalisation

### Modifier vos informations

Éditez le fichier `script.js` et modifiez l'objet `config` :

```javascript
const config = {
    name: "Votre Nom",
    title: "Votre Titre",
    email: "votre.email@example.com",
    github: "https://github.com/votre-username",
    linkedin: "https://linkedin.com/in/votre-profil",
    location: "Votre Ville, Pays"
};
```

### Ajouter vos projets

Dans `script.js`, modifiez le tableau `portfolioData.projects` :

```javascript
projects: [
    {
        name: "Nom du Projet",
        description: "Description du projet",
        tech: ["React", "Node.js"],
        link: "https://github.com/votre-projet"
    }
]
```

### Personnaliser les compétences

Modifiez l'objet `portfolioData.skills` dans `script.js`.

### Changer les couleurs

Dans `style.css`, modifiez les variables CSS :

```css
:root {
    --terminal-bg: #0c0c0c;
    --terminal-fg: #00ff00;
    --terminal-selection: #44ff44;
    --terminal-link: #00aaff;
}
```

## 🎨 Thèmes disponibles

- `matrix` - Vert sur noir (par défaut)
- `hacker` - Style hacker
- `ocean` - Bleu océan
- `sunset` - Orange coucher de soleil
- `purple` - Violet futuriste
- `classic` - Noir et blanc classique

Changez de thème avec : `theme <nom_du_theme>`

## 📦 Technologies utilisées

- [jQuery Terminal](https://terminal.jcubic.pl/) - Émulateur de terminal web
- jQuery - Manipulation DOM
- HTML5/CSS3 - Structure et style
- JavaScript - Logique interactive

## 🌐 Déploiement

### GitHub Pages

1. Allez dans Settings > Pages
2. Sélectionnez la branche `main`
3. Votre site sera disponible à `https://AntoineB0.github.io/Portfolio`

### Netlify

1. Connectez votre repository GitHub
2. Déployez automatiquement
3. Personnalisez le domaine si nécessaire

### Vercel

```bash
npx vercel
```

## 📝 License

MIT License - Libre d'utilisation et de modification

## 👤 Auteur

**Antoine**
- GitHub: [@AntoineB0](https://github.com/AntoineB0)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## ⭐ Support

Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub !

---

Fait avec ❤️ et jQuery Terminal