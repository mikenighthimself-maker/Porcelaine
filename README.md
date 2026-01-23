# Porcelaine

Site web statique bilingue (FR/EN) optimisé pour GitHub Pages.

<!--
PLAN NETTOYAGE (inventaire)
- À supprimer : anciens redirects racine (index-en.html, manifesto-en.html, info-en.html, set-en.html, repertoire-en.html), pages legacy (acces.html, collection.html, silence.html), doublons racine (manifesto.html, info.html, set.html, repertoire.html), anciens assets dispersés (images/, assets/mockup*.svg, assets/video/landing.mp4, assets/css/style.css, assets/js/site.js).
- À conserver : pages canoniques /fr/*.html et /en/*.html, index racine (sélecteur de langue), 404.html, robots.txt, sitemap.xml, assets/img, assets/icons, css/main.css, js/main.js.
- À déplacer : images racine -> assets/img/ ; favicon -> assets/icons/ ; styles.css/js app.js -> css/main.css et js/main.js.
-->

## Structure
```
/
  index.html
  404.html
  robots.txt
  sitemap.xml
  assets/
    img/
    icons/
  css/
    main.css
  js/
    main.js
  fr/
    index.html
    manifesto.html
    collections.html
    repertoire.html
    info.html
  en/
    index.html
    manifesto.html
    collections.html
    repertoire.html
    info.html
  README.md
```

## Routage des langues
- `/` affiche un sélecteur de langue et peut rediriger vers la dernière langue enregistrée.
- Les pages FR vivent sous `/fr/`.
- Les pages EN vivent sous `/en/`.

## Domaine pour les canoniques
Les URLs canoniques et le sitemap utilisent `https://porcelaine.github.io`.
Si votre domaine GitHub Pages est différent, remplacez-le dans :
- `index.html`, `404.html`
- toutes les pages `/fr/*.html` et `/en/*.html`
- `sitemap.xml` et `robots.txt`

## Développement local
Servez le dossier via un serveur statique, par exemple :
```
python3 -m http.server 8000
```
Puis ouvrez `http://localhost:8000`.
