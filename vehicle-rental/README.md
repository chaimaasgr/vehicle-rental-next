# AtracioDrive — Maquette de location de véhicules

Maquette fonctionnelle d'un site de location de véhicules développée avec
**Next.js 14** (App Router), **TypeScript** et **Tailwind CSS**, avec une
**API mock** simulant les données véhicules, options et réservations. Le
projet est structuré pour permettre le remplacement futur de l'API mock par
les API réelles d'**Atracio** sans modifier les composants ni les pages.

## Sommaire

- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Architecture du projet](#architecture-du-projet)
- [Parcours fonctionnel](#parcours-fonctionnel)
- [Documentation de l'API mock](#documentation-de-lapi-mock)
- [Modèle de données](#modèle-de-données)
- [Brancher les API Atracio](#brancher-les-api-atracio)
- [Limites connues](#limites-connues)

## Installation

Prérequis : Node.js ≥ 18 et [pnpm](https://pnpm.io/) ≥ 9.

```bash
# 1. Installer les dépendances
pnpm install

# 2. Lancer le serveur de développement
pnpm dev

# 3. Ouvrir l'application
# http://localhost:3000
```

Aucune variable d'environnement n'est requise : toutes les données sont
servies localement par l'API mock (fichiers JSON dans `/data`).

## Scripts disponibles

| Commande       | Description                                  |
|----------------|-----------------------------------------------|
| `pnpm dev`     | Démarre le serveur de développement Next.js  |
| `pnpm build`   | Génère un build de production                |
| `pnpm start`   | Démarre le serveur en mode production        |
| `pnpm lint`    | Vérifie le code avec ESLint                  |

## Architecture du projet

```
app/
  page.tsx                    Page d'accueil
  catalogue/                  Catalogue + filtres (page.tsx + CatalogueClient.tsx)
  vehicules/[id]/              Page de détail d'un véhicule
  reservation/[id]/            Parcours de réservation (checkout)
  confirmation/[id]/           Page de confirmation de réservation
  api/
    vehicules/                 Endpoints mock : liste + détail véhicule
    options/                   Endpoint mock : liste des options
    reservations/               Endpoints mock : création + lecture de réservation
components/                    Composants UI réutilisables (cartes, filtres, badges, icônes...)
lib/
  data-provider.ts             Interface DataProvider (couche d'abstraction des données)
  mock/mock-data-provider.ts   Implémentation mock (lecture/écriture JSON)
  pricing.ts                   Calculs de prix et formatage, partagés client/serveur
  client-api.ts                Fonctions d'appel aux routes /api/* depuis les composants client
data/
  vehicules.json                Jeu de données de démonstration : véhicules
  options.json                  Jeu de données de démonstration : options
data-store/
  reservations.json             Stockage local des réservations créées (fichier régénéré au runtime)
types/
  index.ts                      Types TypeScript partagés (Vehicle, Reservation, ...)
```

## Parcours fonctionnel

1. **Accueil** (`/`) — présentation du service, véhicules mis en avant,
   avantages, et bouton *Réserver maintenant*.
2. **Catalogue** (`/catalogue`) — liste des véhicules avec filtres
   (catégorie, transmission, places minimum, prix maximum, disponibilité).
3. **Détail véhicule** (`/vehicules/[id]`) — photos, description,
   caractéristiques, options disponibles, prix par jour.
4. **Réservation** (`/reservation/[id]`) — choix des dates, sélection des
   options, informations client, récapitulatif de prix calculé en direct.
5. **Confirmation** (`/confirmation/[id]`) — numéro de réservation, véhicule,
   dates, options, prix total et informations client.

## Documentation de l'API mock

Toutes les routes sont exposées sous `/api` et répondent en JSON, au format
`{ data: ... }` en cas de succès ou `{ error: "message" }` en cas d'erreur.

### `GET /api/vehicules`

Liste les véhicules, avec filtres optionnels en query string :

| Paramètre       | Type                                              | Exemple                |
|-----------------|----------------------------------------------------|--------------------------|
| `category`      | `economique` \| `suv` \| `utilitaire` \| `premium`  | `?category=suv`          |
| `transmission`  | `manuelle` \| `automatique`                        | `?transmission=automatique` |
| `seats`         | nombre — places minimum                            | `?seats=5`                |
| `maxPrice`      | nombre — prix maximum par jour                      | `?maxPrice=60`            |
| `availableOnly` | `true` — ne retourne que les véhicules disponibles  | `?availableOnly=true`     |

### `GET /api/vehicules/:id`

Retourne le détail d'un véhicule. `404` si l'identifiant est inconnu.

### `GET /api/options`

Retourne la liste des options de location disponibles (assurance, GPS,
siège bébé, conducteur additionnel, kilométrage illimité).

### `POST /api/reservations`

Crée une réservation simulée. Le prix est **toujours recalculé côté
serveur** à partir des données véhicule/options, jamais fait confiance
depuis le client.

Corps de la requête :

```json
{
  "vehicleId": "v-003",
  "startDate": "2026-08-01",
  "endDate": "2026-08-05",
  "optionIds": ["opt-assurance", "opt-gps"],
  "customer": {
    "fullName": "Jean Dupont",
    "email": "jean.dupont@email.com",
    "phone": "0612345678"
  }
}
```

Réponse `201` :

```json
{
  "data": {
    "id": "…",
    "reservationNumber": "ATR-2026-482913",
    "vehicleId": "v-003",
    "startDate": "2026-08-01",
    "endDate": "2026-08-05",
    "optionIds": ["opt-assurance", "opt-gps"],
    "customer": { "...": "..." },
    "days": 4,
    "vehiclePrice": 248,
    "optionsPrice": 68,
    "total": 316,
    "createdAt": "2026-07-14T10:00:00.000Z"
  }
}
```

Erreurs possibles : `400` (champs manquants ou dates invalides), `404`
(véhicule introuvable), `409` (véhicule indisponible).

### `GET /api/reservations/:id`

Retourne une réservation créée précédemment. `404` si introuvable — utilisé
par la page de confirmation.

## Modèle de données

Les types complets sont définis dans `types/index.ts`. Résumé :

- **Vehicle** — marque, modèle, catégorie, prix/jour, places, transmission,
  disponibilité, images, description, caractéristiques.
- **RentalOption** — nom, description, prix/jour, icône.
- **Reservation** — véhicule, dates, options, client, nombre de jours, prix
  véhicule, prix options, total, numéro de réservation, date de création.

## Brancher les API Atracio

Toute la logique d'accès aux données passe par l'interface `DataProvider`
définie dans `lib/data-provider.ts`. L'implémentation actuelle
(`mockDataProvider`, dans `lib/mock/mock-data-provider.ts`) lit/écrit des
fichiers JSON locaux.

Pour brancher les API réelles d'Atracio :

1. Créer une nouvelle implémentation de `DataProvider` (par exemple
   `lib/atracio/atracio-data-provider.ts`) qui appelle les endpoints
   Atracio via `fetch`.
2. Remplacer l'export `dataProvider` dans `lib/data-provider.ts` par cette
   nouvelle implémentation.

Aucune page, aucun composant et aucune route `/api/*` n'a besoin d'être
modifié : ils consomment tous `dataProvider`, jamais directement les
fichiers JSON.

## Limites connues

- Les réservations sont stockées dans `data-store/reservations.json` sur le
  système de fichiers local : cela convient pour une démonstration, mais ne
  fonctionne pas tel quel sur une plateforme serverless en production (le
  fichier ne persiste pas entre les invocations). Le remplacement par les
  API Atracio (voir ci-dessus) résoudra ce point.
- Aucune authentification n'est mise en place : ce n'est pas dans le
  périmètre de cette maquette.
- Les photos des véhicules sont de vraies photos automobiles libres de
  droits, sourcées sur Unsplash (Unsplash License — usage commercial libre,
  sans attribution requise). Elles illustrent la catégorie du véhicule
  (citadine, SUV, utilitaire, berline premium) plutôt que le modèle exact,
  aucune photo officielle du constructeur n'étant utilisée. Elles restent
  des visuels de démonstration et n'ont pas de valeur contractuelle.
