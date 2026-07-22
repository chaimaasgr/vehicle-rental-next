# Images des véhicules

Ce dossier contient les photos réelles de chaque véhicule.
**Aucune photo n'est récupérée automatiquement** : c'est à vous de déposer
manuellement, dans le bon sous-dossier, une photo qui correspond exactement
au modèle indiqué. Tant qu'un fichier n'est pas présent, l'application
affiche automatiquement un visuel générique par catégorie (dossier
`placeholders/`) — jamais la photo d'un autre véhicule.

## Où trouver des photos fiables et correctement légendées
- Le site presse / media du constructeur (ex. media.renault.com, presse.peugeot.fr, media.mercedes-benz.com, press.bmwgroup.com, audi-mediacenter.com, porsche.com/international/accessoriesandservices/pressdatabase, media.stellantis.com pour Fiat/Citroën/Dacia).
- Wikimedia Commons (https://commons.wikimedia.org), en recherchant précisément le nom du modèle **et** la génération/millésime indiqués ci-dessous, et en vérifiant la légende de l'image avant de l'utiliser.
- Vos propres photos si vous disposez des véhicules.

Vérifiez toujours que la légende ou la source confirme qu'il s'agit bien
du modèle exact (marque, nom, génération) avant de l'utiliser — en cas de
doute, ne mettez rien : le visuel générique de la catégorie sera utilisé.

## Convention de nommage attendue
Chaque véhicule a son propre sous-dossier `{id}/`. Déposez-y les fichiers
`1.jpg` et `2.jpg` (vous pouvez n'en mettre qu'un seul si vous n'avez
qu'une photo). Le format JPG/PNG/WEBP fonctionne.

| Dossier | Véhicule exact à photographier |
|---|---|
| `v-001/` | Renault Clio V |
| `v-002/` | Peugeot 208 |
| `v-003/` | Volkswagen Tiguan |
| `v-004/` | Dacia Duster |
| `v-005/` | Mercedes-Benz Classe E |
| `v-006/` | BMW Série 4 Cabriolet |
| `v-007/` | Fiat Ducato |
| `v-008/` | Renault Trafic |
| `v-009/` | Toyota Yaris Hybride |
| `v-010/` | Audi Q5 |
| `v-011/` | Citroën C3 |
| `v-012/` | Porsche Macan |

## Exemple
Pour le Renault Clio V (`v-001`), placez vos fichiers ici :
```
public/images/vehicules/v-001/1.jpg
public/images/vehicules/v-001/2.jpg
```
Le fichier `data/vehicules.json` référence déjà ces chemins pour chaque
véhicule — vous n'avez rien à modifier dans le code, juste à ajouter les
fichiers image aux bons endroits.
