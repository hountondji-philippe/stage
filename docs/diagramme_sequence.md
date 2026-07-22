# Diagrammes de séquence pour le backend

Ce document décrit les scénarios principaux à modéliser dans un diagramme de séquence, avec des étapes et des alternatives comme dans ton exemple.

## Participants

- **Utilisateur / Frontend**
- **API**
- **AuthController**
- **MemoireController**
- **EtudiantAutoriseController**
- **RechercheController**
- **AdminRechercheController**
- **FiliereController**
- **SousFiliereController**
- **ActualiteController**
- **User** (modèle)
- **EtudiantAutorise** (modèle)
- **Memoire** (modèle)
- **Filiere** (modèle)
- **SousFiliere** (modèle)
- **Actualite** (modèle)
- **Mail / Token service**
- **Base de données**

---

## Scénario 1 : Activation de compte

1. L'utilisateur saisit son matricule dans le frontend.
2. Frontend envoie `POST /auth/verifier-matricule` vers l'API.
3. `AuthController@verifierMatricule` cherche `EtudiantAutorise` par `matricule`.

alt [matricule introuvable]
- `AuthController` renvoie une erreur `404`.
else [matricule trouvé]
- si `compte_active = true` : renvoyer erreur `409`.
- sinon : générer `token_activation` + `token_expires_at`.
- appeler `Mail service` pour envoyer l'email d'activation.
end alt

4. L'utilisateur reçoit le lien d'activation dans sa boîte mail.
5. L'utilisateur clique sur le lien et soumet `POST /auth/activer-compte` avec `token` et `password`.
6. `AuthController@activerCompte` vérifie le token.

alt [token invalide ou expiré]
- renvoyer erreur `404` ou `410`.
else [token valide]
- créer un `User` lié à `EtudiantAutorise`.
- mettre `compte_active = true` et supprimer le token.
- créer un token d'authentification Sanctum.
- renvoyer `auth_token`.
end alt

---

## Scénario 2 : Connexion

1. L'utilisateur saisit email + mot de passe.
2. Frontend envoie `POST /auth/login`.
3. `AuthController@login` cherche `User` par `email`.
4. Vérification du mot de passe.

alt [identifiants invalides]
- renvoyer erreur `401`.
else [identifiants valides]
- créer un token Sanctum.
- renvoyer le token et les données utilisateur.
end alt

---

## Scénario 3 : Déposer un mémoire

1. L'utilisateur authentifié remplit le formulaire et sélectionne un fichier PDF.
2. Frontend envoie `POST /memoires` avec les données et le fichier.
3. `MemoireController@store` valide le payload.

alt [données invalides]
- renvoyer erreur `422`.
else [données valides]
- si `mode_depot = binome` : vérifier `matricule_binome` dans `EtudiantAutorise`.

  alt [binôme invalide]
  - renvoyer erreur `422`.
  else [binôme valide]
  - récupérer `nom_binome` et `prenom_binome`.
  end alt

- stocker le fichier PDF dans `Storage::disk('local')`.
- générer l'aperçu PDF et la fiche de dépôt.
- créer l'enregistrement `Memoire` avec `statut = en_attente`.
- renvoyer confirmation de dépôt.
end alt

---

## Scénario 4 : Modifier un mémoire

1. L'utilisateur authentifié envoie `PUT /memoires/{memoire}`.
2. `MemoireController@update` vérifie l'identité du propriétaire (`memoire.user_id`).

alt [utilisateur non propriétaire]
- renvoyer erreur `403`.
else [propriétaire]
- si `memoire.statut = valide` : renvoyer erreur `409`.
- valider les nouvelles données.
- si un nouveau fichier est envoyé, supprimer l'ancien et stocker le nouveau.
- si `statut = rejete`, remettre le mémoire en `en_attente` et effacer `motif_rejet`.
- mettre à jour l'enregistrement et renvoyer confirmation.
end alt

---

## Scénario 5 : Supprimer un mémoire

1. L'utilisateur envoie `DELETE /memoires/{memoire}`.
2. `MemoireController@destroy` vérifie que l'utilisateur est propriétaire.

alt [pas propriétaire]
- renvoyer erreur `403`.
else [propriétaire]
- si `memoire.statut != en_attente`
  - renvoyer erreur `409`.
- supprimer les fichiers associés et l'enregistrement.
- renvoyer confirmation.
end alt

---

## Scénario 6 : Recherche publique

1. Le visiteur saisit des filtres ou une requête.
2. Frontend envoie `GET /recherche/memoires` ou `GET /recherche-globale`.
3. `MemoireController@rechercherPublic` / `RechercheController@index` exécute la recherche sur les mémoires validés.
4. L'API renvoie les résultats.

---

## Scénario 7 : Valider ou rejeter un mémoire (admin)

1. L'administrateur demande `GET /admin/memoires/en-attente`.
2. L'API renvoie la liste des mémoires en attente.
3. L'admin choisit un mémoire et envoie `POST /admin/memoires/{memoire}/valider` ou `/rejeter`.

alt [valider]
- `MemoireController@valider` met `statut = valide`, `valide_par`, `valide_le`.
- renvoyer succès.
else [rejeter]
- `MemoireController@rejeter` vérifie `motif_rejet`.
- met `statut = rejete`, `motif_rejet`, `valide_par`, `valide_le`.
- renvoyer succès.
end alt

---

## Scénario 8 : Gestion admin CRUD

1. L'admin utilise le frontend d'administration.
2. Il envoie une requête CRUD sur filières, sous-filières, actualités ou étudiants autorisés.
3. Le contrôleur valide et applique l'opération.
4. L'API renvoie le résultat.

---

## Conseils pour le diagramme

- Utilise des blocs `alt` pour les cas success / erreur.
- Indique clairement les conditions : `matricule trouvé`, `token valide`, `utilisateur propriétaire`, `statut en_attente`.
- Sépare les interactions : frontend → API, API → contrôleur, contrôleur → modèle, modèle → base de données.
- Pour `Memoire` et `User`, dessine deux flèches distinctes si tu veux représenter `user_id` et `valide_par`.

Tu peux copier ce fichier pour faire tes diagrammes de séquence exactement comme l'exemple que tu as envoyé.