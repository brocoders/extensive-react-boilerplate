#!/bin/bash

echo "🧹 Suppression des node_modules et package-lock.json"
rm -rf node_modules package-lock.json

echo "🔧 Ajout des overrides sécurisées dans package.json"

npx json -I -f package.json -e '
this.overrides = {
  "elliptic": "^6.6.1",
  "micromatch": "^4.0.8",
  "braces": "^3.0.3",
  "image-size": "^1.3.0",
  "nanoid": "^3.3.8",
  "utf7": "^1.0.3",
  "semver": "^5.7.2"
 }'

echo "📦 Réinstallation des packages avec les overrides"
npm install

echo "🩹 Tentative d\'audit fix automatique"
npm audit fix

echo "🔍 Vérifications post-correctif"
echo "➡️ Build Next.js"
npm run build

echo "➡️ Lint du code"
npm run lint

echo "➡️ Lancement des tests Playwright (si présents)"
npx playwright test || echo "❗️Playwright non configuré ou tests échoués"

echo "➡️ Vérification Storybook"
npm run sb || echo "❗️Storybook non disponible ou erreur"

echo "✅ Fini. Vérifie manuellement les fonctionnalités sensibles."
