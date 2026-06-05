# ASSEMBENE — Site Web

Site vitrine Jekyll déployé sur Netlify.

## Structure

```
assembene/
├── _includes/         # Composants réutilisables (navbar, footer)
├── _layouts/          # Templates de pages
├── assets/
│   ├── css/           # Styles SCSS
│   ├── js/            # JavaScript
│   └── images/        # Images et favicon
├── index.html         # Page principale (toutes les sections)
├── _config.yml        # Configuration Jekyll
├── netlify.toml       # Configuration Netlify
└── Gemfile
```

## Déploiement sur Netlify

1. **Pousser sur GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Initial commit — site ASSEMBENE"
   git remote add origin https://github.com/ASSEMBENE/site-assembene.git
   git push -u origin main
   ```

2. **Connecter à Netlify** :
   - Aller sur app.netlify.com
   - "Add new site" → "Import an existing project"
   - Choisir le dépôt GitHub
   - Build command : `jekyll build`
   - Publish directory : `_site`
   - Cliquer "Deploy site"

3. **Formulaire de contact** : Netlify Forms est déjà configuré (`data-netlify="true"`).

## Personnalisation

### Couleurs
Modifier les variables CSS dans `assets/css/main.scss` :
```css
--color-primary:  #0A2342;   /* bleu marine */
--color-accent:   #C8A96E;   /* or */
```

### Contenu
Modifier directement `index.html` pour :
- Le texte du hero (titre, description, stats)
- Les services (icônes, titres, descriptions)
- Les réalisations (photos, titres, tags)
- Les informations de contact

### Images
Remplacer les URLs Unsplash par vos propres photos dans `index.html`.
