# Schéma des classes pour Visual Paradigm

## Classes et attributs

### User
- id
- email
- password
- role (`etudiant`, `admin`)
- etudiant_autorise_id (FK nullable vers `EtudiantAutorise.id`)
- email_verified_at
- remember_token
- created_at
- updated_at

### EtudiantAutorise
- id
- matricule
- email
- nom
- prenom
- filiere_id (FK vers `Filiere.id`)
- annee_scolaire
- niveau (`L1`, `L2`, `L3`, `M1`, `M2`)
- compte_active
- token_activation
- token_expires_at
- created_at
- updated_at

### Filiere
- id
- nom
- description
- created_at
- updated_at

### SousFiliere
- id
- nom
- filiere_id (FK vers `Filiere.id`)
- created_at
- updated_at

### Memoire
- id
- user_id (FK vers `User.id`)
- titre
- resume
- filiere_id (FK vers `Filiere.id`)
- sous_filiere_id (FK nullable vers `SousFiliere.id`)
- annee
- encadrant
- fichier_memoire
- apercu
- fichier_preuve
- statut (`en_attente`, `valide`, `rejete`)
- motif_rejet
- valide_par (FK nullable vers `User.id`)
- valide_le
- views_count
- cycle
- mode_depot (`unique`, `binome`)
- matricule_binome
- nom_binome
- prenom_binome
- created_at
- updated_at

### Actualite
- id
- titre
- contenu
- icone
- date_publication
- created_at
- updated_at

### PasswordResetToken
- email (PK)
- token
- created_at

### Session
- id (PK)
- user_id (FK nullable vers `User.id`)
- ip_address
- user_agent
- payload
- last_activity


## Relations

- `User` 0..1 → 1 `EtudiantAutorise`
  - `users.etudiant_autorise_id` → `etudiants_autorises.id`
- `EtudiantAutorise` * → 1 `Filiere`
  - `etudiants_autorises.filiere_id` → `filieres.id`
- `Filiere` 1 → * `EtudiantAutorise`
- `Filiere` 1 → * `Memoire`
  - `memoires.filiere_id` → `filieres.id`
- `Filiere` 1 → * `SousFiliere`
  - `sous_filieres.filiere_id` → `filieres.id`
- `SousFiliere` * → 1 `Filiere`
- `Memoire` * → 1 `User`
  - `memoires.user_id` → `users.id`
- `Memoire` * → 0..1 `SousFiliere`
  - `memoires.sous_filiere_id` → `sous_filieres.id`
- `Memoire` * → 0..1 `User` (validateur)
  - `memoires.valide_par` → `users.id`
- `User` 1 → * `Memoire`
- `Session` 0..1 → 1 `User`
  - `sessions.user_id` → `users.id`


## Notes pour Visual Paradigm

- Crée chaque classe avec ses attributs.
- Ajoute des associations entre classes selon les relations ci-dessus.
- Pour `Memoire` et `User`, ajoute deux associations si nécessaire :
  - `user_id` comme propriétaire du mémoire
  - `valide_par` comme validateur du mémoire
- `PasswordResetToken` est une table d'infrastructure sans relation Eloquent explicite dans le code, mais elle se lie conceptuellement à `User` par `email`.

Tu peux copier directement ce fichier pour construire ton diagramme dans Visual Paradigm.