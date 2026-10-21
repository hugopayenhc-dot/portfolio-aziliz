# Portfolio — Aziliz Dupont Huin

Site portfolio d'Aziliz Dupont Huin, sculptrice et illustratrice (EESAB Quimper).

- **Le site** : fait avec [Astro](https://astro.build) (pages rapides, sans base de données).
- **L'administration** (`/admin`) : faite avec [Decap CMS](https://decapcms.org). Elle permet d'ajouter et de modifier tout le contenu **sans écrire de code**.
- **L'hébergement** : [Netlify](https://www.netlify.com) (gratuit pour un site comme celui-ci).

---

## Sommaire

1. [Comment ça marche (en deux mots)](#1-comment-ça-marche-en-deux-mots)
2. [Lancer le site sur son ordinateur](#2-lancer-le-site-sur-son-ordinateur)
3. [Mettre le site en ligne (une seule fois)](#3-mettre-le-site-en-ligne-une-seule-fois)
4. [Activer la connexion à l'admin (une seule fois)](#4-activer-la-connexion-à-ladmin-une-seule-fois)
5. [Guide pour Aziliz : ajouter un travail avec des photos](#5-guide-pour-aziliz--ajouter-un-travail-avec-des-photos)
6. [Autres modifications courantes](#6-autres-modifications-courantes)
7. [Où se trouve quoi (pour les curieux)](#7-où-se-trouve-quoi-pour-les-curieux)

---

## 1. Comment ça marche (en deux mots)

Tout le contenu (textes, photos) est rangé dans un **dépôt GitHub**, une sorte de dossier en ligne qui garde l'historique de chaque modification.

Quand Aziliz enregistre quelque chose dans `/admin` :

1. l'admin range la modification dans GitHub ;
2. Netlify le voit et **reconstruit le site tout seul** ;
3. **1 à 2 minutes plus tard**, la modification est en ligne.

Rien ne peut être « cassé » pour de bon : chaque version est gardée dans GitHub.

---

## 2. Lancer le site sur son ordinateur

> Cette partie est pour la personne qui s'occupe de la technique. Aziliz n'en a pas besoin.

### Ce qu'il faut installer (une seule fois)

- **Node.js** version 20 ou plus : <https://nodejs.org> → bouton « LTS » → installer.
- **Git** : <https://git-scm.com> → télécharger → installer (garder les options par défaut).

### Lancer le site

Ouvrez un terminal dans le dossier du projet, puis :

```bash
npm install
```

(seulement la première fois : télécharge les outils nécessaires), puis :

```bash
npm run dev
```

Ouvrez ensuite <http://localhost:4321> dans le navigateur. Le site se met à jour à chaque modification d'un fichier.

### Tester l'admin sur son ordinateur (facultatif)

Dans un **deuxième** terminal, pendant que `npm run dev` tourne :

```bash
npm run admin
```

Puis ouvrez <http://localhost:4321/admin/index.html>. Les modifications sont alors écrites directement dans les fichiers du dossier (pas besoin d'être connecté à GitHub).

### Vérifier que le site se construit sans erreur

```bash
npm run build
```

---

## 3. Mettre le site en ligne (une seule fois)

Comptez environ 20 minutes.

### Étape 1 — Créer un compte GitHub

1. Allez sur <https://github.com> et cliquez sur **Sign up**.
2. Créez le compte (idéalement **au nom d'Aziliz**, c'est elle qui l'utilisera pour se connecter à l'admin).

### Étape 2 — Envoyer le projet sur GitHub

1. Sur GitHub, cliquez sur **+** (en haut à droite) → **New repository**.
2. Nom : `portfolio-aziliz`. Laissez **Public** ou choisissez **Private** (les deux marchent). Ne cochez rien d'autre. Cliquez sur **Create repository**.
3. Dans un terminal, dans le dossier du projet, tapez une par une (en remplaçant `VOTRE-COMPTE` par le nom du compte GitHub) :

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Premier envoi du portfolio"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/VOTRE-COMPTE/portfolio-aziliz.git
```

```bash
git push -u origin main
```

### Étape 3 — Dire à l'admin où se trouve le dépôt

1. Ouvrez le fichier `public/admin/config.yml`.
2. Ligne `repo:`, remplacez `VOTRE-COMPTE-GITHUB/portfolio-aziliz` par le vrai nom, par exemple `aziliz-dh/portfolio-aziliz`.
3. Enregistrez, puis envoyez la modification :

```bash
git commit -am "Réglage de l'admin"
```

```bash
git push
```

### Étape 4 — Brancher Netlify

1. Allez sur <https://app.netlify.com> et cliquez sur **Sign up** → **Sign up with GitHub** (le plus simple).
2. Cliquez sur **Add new project** (ou « Add new site ») → **Import an existing project** → **GitHub**.
3. Autorisez Netlify à voir vos dépôts, puis choisissez `portfolio-aziliz`.
4. Netlify lit tout seul le fichier `netlify.toml` : ne changez rien, cliquez sur **Deploy**.
5. Attendez 1 à 2 minutes : le site est en ligne à une adresse du type `https://quelque-chose.netlify.app`.
6. Pour choisir une adresse plus jolie : **Project configuration** → **Change project name** → par exemple `aziliz-dupont-huin` → l'adresse devient `https://aziliz-dupont-huin.netlify.app`.

### Étape 5 — Mettre la bonne adresse dans le projet

Si l'adresse finale n'est pas `https://aziliz-dupont-huin.netlify.app`, remplacez-la dans ces trois fichiers :

- `astro.config.mjs` (ligne `site:`)
- `public/admin/config.yml` (ligne `site_url:`)
- `public/robots.txt` (dernière ligne)

Puis `git commit -am "Adresse du site"` et `git push`.

### (Plus tard) Un nom de domaine personnel

Si vous achetez un nom comme `azilizdupont.fr` : dans Netlify → **Domain management** → **Add a domain** et suivez les indications. Pensez ensuite à mettre la nouvelle adresse dans les trois fichiers de l'étape 5.

---

## 4. Activer la connexion à l'admin (une seule fois)

L'admin utilise la **connexion GitHub** : Aziliz se connecte avec son compte GitHub, via Netlify. (L'ancienne méthode de Netlify « Identity / Git Gateway » est abandonnée par Netlify, on ne l'utilise donc pas.)

### Étape 1 — Créer une « application OAuth » sur GitHub

C'est ce qui permet à l'admin de demander « est-ce bien Aziliz ? » à GitHub.

1. Sur GitHub : cliquez sur la photo de profil → **Settings** → tout en bas à gauche **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Remplissez :
   - **Application name** : `Admin portfolio Aziliz`
   - **Homepage URL** : l'adresse du site, ex. `https://aziliz-dupont-huin.netlify.app`
   - **Authorization callback URL** : exactement `https://api.netlify.com/auth/done`
3. Cliquez sur **Register application**.
4. Sur la page qui s'affiche : notez le **Client ID**, puis cliquez sur **Generate a new client secret** et copiez le **secret** (il ne s'affiche qu'une fois).

### Étape 2 — Donner ces informations à Netlify

1. Dans Netlify, ouvrez le projet → **Project configuration** → **Access & security** (ou « Access control ») → **OAuth**.
2. Section **Authentication providers** → **Install provider** → choisissez **GitHub**.
3. Collez le **Client ID** et le **Client secret**, puis **Install**.

### Étape 3 — Tester

1. Allez sur `https://VOTRE-SITE.netlify.app/admin/`.
2. Cliquez sur **Se connecter avec GitHub** et acceptez.
3. L'admin s'ouvre : c'est prêt ! 🎉

> **Si quelqu'un d'autre doit pouvoir modifier le site** : sur GitHub, ouvrez le dépôt → **Settings** → **Collaborators** → **Add people**. Cette personne pourra alors se connecter à l'admin avec son propre compte GitHub.

> **Plus tard, si Aziliz préfère se connecter avec un simple e-mail et un mot de passe** (sans compte GitHub) : c'est possible avec le service gratuit [DecapBridge](https://decapbridge.com). Il faudra alors changer la partie `backend:` de `public/admin/config.yml` en suivant leurs instructions.

---

## 5. Guide pour Aziliz : ajouter un travail avec des photos

### Se connecter

1. Ouvrez **l'adresse du site suivie de `/admin/`**. Exemple : `https://aziliz-dupont-huin.netlify.app/admin/`
   (Astuce : ajoutez cette page à vos favoris.)
2. Cliquez sur **Se connecter avec GitHub**.
3. Si GitHub le demande, entrez votre identifiant et votre mot de passe GitHub.

Vous arrivez sur l'admin. À gauche, il y a 4 sections :

| Section | Ce qu'on y trouve |
| --- | --- |
| **Travaux** | Toutes vos œuvres, inspirations, étapes de construction |
| **Rubriques** | Les 6 rubriques : sous-titre, texte d'intro, image de couverture |
| **CV** | Vos écoles et apprentissages |
| **Réglages** | E-mail, Instagram, portrait, bio, démarche |

### Ajouter un nouveau travail

1. Cliquez sur **Travaux**, puis sur le bouton **Nouveau Travail** (en haut).
2. Remplissez la fiche, de haut en bas :
   - **Titre** : le nom de l'œuvre.
   - **Titre en anglais** : facultatif.
   - **Date** : cliquez et choisissez une date (seule l'année sera affichée).
   - **Rubrique** : Dessin, Sculpture, Minotaure, Marionnette ou Autres projets.
   - **Sous-rubrique** : par exemple « Œuvres » ou « Inspiration ». *Pour « Autres projets », laissez vide.*
3. **Ajouter des photos** :
   1. Dans **Photos**, cliquez sur **Ajouter photos** (ou « Add photos »).
   2. Cliquez sur **Choisir une image** → **Téléverser** (ou « Upload ») → choisissez la photo sur votre ordinateur.
   3. Une fois la photo envoyée, cliquez dessus puis sur **Choisir l'image sélectionnée**.
   4. Remplissez **Description de la photo** : ce qu'on voit, en quelques mots (ex. « Taureau en carton, vue de profil »). C'est important pour les personnes malvoyantes et pour Google.
   5. Recommencez pour chaque photo. **La première photo est la photo principale.** Pour changer l'ordre, faites glisser les photos avec la poignée ⋮⋮.
4. Remplissez si besoin **Matériaux**, **Dimensions**, **Source / crédit** (pour une inspiration : l'artiste, l'année…) et **Lien vidéo** (YouTube ou Vimeo).
5. **Texte** : écrivez la description.
   *Astuce : sélectionnez un mot et cliquez sur **B** (gras) : il s'affichera sur le site en grandes lettres espacées, comme un mot-clé.*
6. **Ordre d'affichage** : 1 = en premier, 2 = ensuite… (laissez 0 si ça vous est égal).
7. Laissez **Publié** coché.
8. Cliquez sur **Publier** (en haut) → **Publier maintenant**.

✅ Le travail apparaît sur le site **1 à 2 minutes plus tard** (rechargez la page).

### Modifier ou cacher un travail

- **Modifier** : Travaux → cliquez sur le travail → changez ce que vous voulez → **Publier**.
- **Cacher sans supprimer** : décochez **Publié** → **Publier**. Le travail disparaît du site mais reste dans l'admin.
- **Supprimer** : ouvrez le travail → bouton **Supprimer l'entrée** (en haut). ⚠️ Définitif depuis l'admin.

### Conseils pour les photos

- Format **JPG** de préférence, **moins de 5 Mo** par photo.
- Pas besoin de les redimensionner : le site crée automatiquement des versions légères pour les téléphones.
- Évitez les espaces et accents dans le nom des fichiers (ex. `boeuf-profil.jpg` plutôt que `Bœuf profil.JPG`).

### Si quelque chose ne marche pas

- **La modification n'apparaît pas** : attendez 2 minutes et rechargez la page (Ctrl + F5 sur ordinateur).
- **Toujours rien après 5 minutes** : la personne qui s'occupe de la technique peut regarder dans Netlify, onglet **Deploys** : une ligne rouge indique une erreur, souvent un champ obligatoire mal rempli (ex. une photo sans image).

---

## 6. Autres modifications courantes

| Je veux… | Où ? |
| --- | --- |
| Changer le texte d'intro d'une rubrique | **Rubriques** → la rubrique → *Texte d'introduction* |
| Mettre une image de couverture (accueil + menu) | **Rubriques** → la rubrique → *Image de couverture* |
| Changer l'ordre des rubriques | **Rubriques** → *Ordre* (1 à 6) |
| Ajouter un stage au CV | **CV** → **Nouveau Ligne de CV** |
| Mettre mon portrait, ma bio, ma démarche | **Réglages** → *Réglages du site* |
| Changer mon e-mail ou mon Instagram | **Réglages** → *Réglages du site* |
| Mettre une grande photo sur l'accueil | **Réglages** → *Image d'accueil* |

**La langue anglaise** : chaque champ « … en anglais » est facultatif. S'il est vide, le texte français s'affiche aussi quand un visiteur choisit EN dans le menu.

---

## 7. Où se trouve quoi (pour les curieux)

```
src/
  content/             ← tout le contenu (modifié par l'admin)
    posts/             ← un fichier .md par travail
    categories/        ← un fichier .json par rubrique
    cv/                ← un fichier .json par ligne de CV
    settings/site.json ← réglages généraux
  assets/uploads/      ← les photos envoyées depuis l'admin
  data/structure.js    ← liste fixe des rubriques / sous-rubriques + textes de l'interface (FR/EN)
  pages/               ← les pages du site (accueil, rubrique, travail, à propos, 404)
  components/          ← morceaux réutilisés (barre du haut, menu, recherche…)
  scripts/             ← le peu de JavaScript (menu, recherche, visionneuse, langue)
  styles/global.css    ← toutes les couleurs et la mise en page
public/admin/          ← l'administration (config.yml = les champs de l'admin)
netlify.toml           ← réglages de Netlify
```

**Changer une couleur** : en haut de `src/styles/global.css` (section « Couleurs et réglages »).
**Ajouter une sous-rubrique** : `src/data/structure.js` **et** la liste « Sous-rubrique » dans `public/admin/config.yml`.
