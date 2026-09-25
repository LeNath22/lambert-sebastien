# Lambert Sébastien SRL — site web

Site statique : HTML, CSS et JavaScript, **sans aucune dépendance externe**
(pas de framework, pas de CDN, pas de police distante). Il fonctionne hors ligne
et se dépose tel quel chez n'importe quel hébergeur.

```
lambert-sebastien/
├── index.html
├── styles.css
├── script.js
├── LISEZ-MOI.md            (ce fichier)
├── LANCER LE SITE.cmd      (facultatif — voir ci-dessous)
├── serveur.ps1             (petit serveur local, utilisé par le lanceur)
└── assets/
    ├── camionette.jpeg
    ├── logo/
    │   ├── logo-lambert-sebastien.png        (orange, fond transparent)
    │   └── logo-lambert-sebastien-blanc.png  (blanc, pour fonds foncés)
    ├── partenaires/                           8 logos des partenaires
    └── realisations/                          26 photos de chantiers
```

## Voir le site sur votre ordinateur

**Le plus simple : double-cliquez sur `index.html`.** Il s'ouvre dans votre
navigateur et tout fonctionne — galerie, filtres, formulaires, mode sombre.

Si vous préférez le voir servi exactement comme il le sera en ligne (à l'adresse
`http://localhost:8100/`), double-cliquez sur **`LANCER LE SITE.cmd`** : une
fenêtre noire s'ouvre (le serveur, laissez-la), et le site apparaît dans votre
navigateur. Pour arrêter, fermez la fenêtre noire. Ce lanceur est facultatif ;
vous pouvez supprimer les deux fichiers `LANCER LE SITE.cmd` et `serveur.ps1`
sans rien casser, ils ne font pas partie du site.

Si Windows affiche un avertissement « l'éditeur est inconnu » au lancement,
cliquez sur *Informations complémentaires* puis *Exécuter quand même* : c'est
votre propre fichier, pas un programme téléchargé.

---

## 1. Le logo — une action reste à faire

Votre logo vectoriel `nouveaulogo.pdf` (Adobe Illustrator) ne peut pas être lu
directement par un navigateur. Les deux PNG du dossier `assets/logo/` ont été
produits à partir de **l'aperçu intégré au PDF**, qui ne fait que **256 × 252 px**.

C'est suffisant pour l'affichage actuel (46 px dans l'en-tête, 34 px dans le pied
de page), mais insuffisant pour un grand format ou pour de l'impression.

**Ce qu'il faut faire, dans Illustrator :**

- `Fichier ▸ Exporter ▸ Exporter sous…` → format **SVG**, nommé `logo-lambert-sebastien.svg`
- ou `Exporter pour les écrans` → **PNG**, fond transparent, largeur ≥ 1000 px

Placez ensuite le fichier dans `assets/logo/` et remplacez les occurrences de
`logo-lambert-sebastien.png` dans `index.html` (elles sont au nombre de 4 :
l'icône d'onglet, l'en-tête, la pastille du héro et le pied de page).

La couleur orange de la marque a été relevée directement sur le logo :
**`#EC6136`**. Elle sert d'accent sur tout le site (boutons, liens, filets).

---

## 2. Les photos

Les 26 photos de la section « Réalisations » sont vos vraies photos de chantier.
Elles ont été renommées en français pour le référencement (le nom du fichier est
lu par Google) et chacune possède un texte alternatif décrivant la pièce.

**Deux remarques :**

- La plupart des photos font 480 × 640 px ou 640 × 480 px, ce qui est petit.
  Elles s'affichent bien dans la grille, mais restent un peu justes en plein
  écran dans la visionneuse. Si vous disposez des originaux depuis le téléphone,
  remplacez les fichiers en gardant les mêmes noms : rien d'autre à modifier.
- `salle-de-bain-grise-robinetterie-noire.jpeg` a été prise de biais. Elle est
  conservée telle quelle (aucune rotation ne la redresse), mais elle mériterait
  d'être reprise.

Une photo de l'ancien lot n'a **pas** été reprise : elle montrait une salle de
bain à carrelage blanc daté avec sol en terrazzo, qui ressemble davantage à un
« avant travaux » qu'à une réalisation. Dites-moi si vous souhaitez la remettre.

### Ajouter une réalisation

Copiez un bloc `<button class="card">` dans `index.html` et adaptez-le :

```html
<button class="card" type="button" data-cats="douche meuble"
        data-title="Titre affiché" data-detail="Sous-titre">
  <img src="assets/realisations/mon-fichier.jpeg" alt="Description de la photo"
       width="480" height="640" loading="lazy" decoding="async">
  <span class="card__overlay"><b>Titre affiché</b><span>Sous-titre</span></span>
</button>
```

`data-cats` pilote les filtres. Valeurs disponibles, séparées par une espace :
`douche`, `baignoire`, `meuble`, `combles`, `wc`.

---

## 3. Les partenaires

Les 8 partenaires de votre ancien site sont mis en avant dans leur propre
section, avec **leur logo**, leur spécialité et un lien vers leur site.

Les fichiers ont été récupérés directement sur le site officiel de chaque
marque et enregistrés dans `assets/partenaires/` :

| Partenaire | Fichier | Source |
|---|---|---|
| Schelfhout | `schelfhout.svg` | schelfhout.com |
| Meurer | `meurer.svg` | meurer.be |
| Facq | `facq.svg` | facq.be |
| Salgar | `salgar.svg` | salgar.net |
| Vitrerie Duchaine | `duchaine.png` | vitrerieduchaine.be |
| Steel Elec | `steelelec.jpg` | steelelec.be |
| Amay Barrisol | `barrisol.jpg` | amay-barrisol.be |
| Big Mat Poleur-Kinet | `bigmat.svg` | magasins.bigmat.be |

Cinq sont en SVG (nets à toute taille), trois seulement en JPEG ou PNG de
petite taille — c'est tout ce que ces sociétés publient. Si vous voulez une
qualité irréprochable, demandez-leur leur logo vectoriel et remplacez le
fichier en gardant le même nom.

Comme les logos viennent de sources différentes (certains transparents,
d'autres sur fond blanc), chacun est posé sur une **plaque blanche** qui les
unifie. Cette plaque reste blanche en thème sombre : sans elle, les JPEG
afficheraient un rectangle blanc au milieu d'une carte foncée.

> **Un logo est une marque déposée.** Afficher ceux de ses fournisseurs est une
> pratique courante et légitime pour un installateur, mais l'accord de chaque
> partenaire reste la règle. Un simple e-mail suffit en général — et la plupart
> y voient un avantage commercial. Si l'un d'eux refuse, remplacez son bloc
> `<span class="partner__plate">…</span>` par son nom en toutes lettres.

> **Deux orthographes corrigées.** Votre ancien site écrivait « Shelfhout » et
> « Amay Barisol », alors que les sites de ces sociétés s'écrivent
> **Schelfhout** et **Barrisol** (deux « r »). Les logos téléchargés le
> confirment.

---

## 4. Les deux formulaires

Le site étant statique, les deux formulaires (**demande de devis** et
**inscription** dans le pied de page) ouvrent le logiciel de messagerie du
visiteur avec un message pré-rempli vers `lambertseba73@gmail.com`.

C'est fonctionnel, mais tout le monde n'a pas de messagerie configurée. Pour
recevoir les demandes directement dans votre boîte, créez un compte gratuit sur
**Formspree** ou **Netlify Forms**, puis dans `index.html` remplacez :

```html
<form class="quote" id="quoteForm" novalidate>
```

par :

```html
<form class="quote" action="https://formspree.io/f/VOTRE_ID" method="POST">
```

et supprimez le bloc « formulaire de devis » dans `script.js`.

---

## 5. La galerie défilante

Entre le héro et la grille des réalisations, une section pleine largeur fait
défiler 12 photos dans un **couloir en perspective** : deux rails symétriques
de cartes remontent du point de fuite vers le visiteur.

Le composant d'origine était écrit en React et Tailwind. Le site étant en
HTML/CSS pur, la technique a été portée en vanilla : les images-clés de
l'animation sont calculées dans `script.js` puis injectées dans la page.
Le rendu et la géométrie sont identiques.

**Choisir les photos affichées.** Dans `script.js`, modifiez la liste `PHOTOS`
(sans l'extension `.jpeg`) :

```js
var PHOTOS = [
  "salle-de-bain-marbre-anthracite-double-vasque",
  "salle-de-bain-beige-douche-et-baignoire",
  ...
];
```

**Régler l'effet.** Toujours dans `script.js`, juste au-dessus :

| Réglage | Effet |
|---|---|
| `SPEED` | Secondes pour traverser tout le couloir. Plus haut = plus lent. |
| `CARDS` | Cartes par rail. Plus haut = couloir plus dense, pas plus rapide. |
| `PATH.perspective` | Plus bas = grand-angle, effet plus spectaculaire. |
| `PATH.exitHeight` | Taille des cartes au moment où elles sortent du cadre. |
| `PATH.fan` | Vitesse d'ouverture des rails au départ. |

Trois réglages sont liés : le ruban ne reste continu que si les cartes
successives se chevauchent. Augmenter `exitHeight`, baisser `CARDS` ou réduire
`PATH.railExit` finit par ouvrir une déchirure près du bord de l'écran.

Si le visiteur a activé « réduire les animations » dans son système, le couloir
se fige sur une image complète au lieu de disparaître.

---

## 6. Le pied de page et le mode sombre

Le pied de page reprend la mise en page demandée : quatre colonnes
(inscription, liens rapides, coordonnées, réseaux), puis une barre inférieure.
Le site étant en HTML/CSS pur, il a été reconstruit sans React ni Tailwind, mais
la structure et le rendu sont identiques.

L'interrupteur soleil / lune est **réellement fonctionnel** : il bascule tout le
site en thème sombre et retient le choix du visiteur. Par défaut, le site suit
la préférence du système d'exploitation.

Les trois liens du bas — *Politique de confidentialité*, *Conditions générales*,
*Gestion des cookies* — pointent pour l'instant vers `#`. **Ces pages restent à
écrire.** La politique de confidentialité est obligatoire en Belgique dès lors
que le site collecte une adresse e-mail.

---

## 7. Coordonnées affichées

Reprises de votre ancien site — **à vérifier** :

| | |
|---|---|
| Téléphone | 0497 29 91 48 |
| E-mail | lambertseba73@gmail.com |
| Adresse | Rue aux Granges 35, 4480 Clermont-sous-Huy (Engis) |
| Horaires | Du lundi au vendredi, 8h00 – 19h00 |
| Facebook | page Lambert Sébastien SRL |

Elles apparaissent à trois endroits : la section Contact, le pied de page et les
données structurées (le bloc `application/ld+json` en haut de `index.html`, que
Google lit pour afficher votre fiche entreprise).

Le logo indique **SRL**, alors que l'ancien site et Facebook indiquent encore
**SPRL**. J'ai retenu SRL partout sur le site, conformément au nouveau logo.

---

## 8. Mise en ligne

Aucun serveur particulier n'est nécessaire. Déposez le contenu du dossier à la
racine de votre hébergement, ou utilisez un service gratuit — Netlify,
Cloudflare Pages ou GitHub Pages acceptent un simple glisser-déposer du dossier.

Pensez ensuite à faire pointer le domaine **lambertsebastien.be** vers le
nouveau site.
