# Acteurs et Endpoints

Tableau des acteurs, endpoints, méthodes HTTP, contrôleurs, et permissions.

| Acteur | Méthode | Endpoint | Contrôleur@méthode | Auth requis | Admin requis | Description |
|---|---:|---|---|---:|---:|---|
| Visiteur | POST | /auth/verifier-matricule | AuthController@verifierMatricule | non | non | Vérifier matricule autorisé pour création de compte |
| Visiteur | POST | /auth/activer-compte | AuthController@activerCompte | non | non | Activer compte via token d'activation |
| Visiteur | POST | /auth/renvoyer-lien | AuthController@renvoyerLien | non | non | Renvoyer lien d'activation |
| Visiteur | POST | /auth/login | AuthController@login | non | non | Connexion et obtention de token |
| Visiteur | POST | /auth/mot-de-passe-oublie | AuthController@demanderReinitialisation | non | non | Demander réinitialisation mot de passe |
| Visiteur | POST | /auth/reinitialiser-mot-de-passe | AuthController@reinitialiserMotDePasse | non | non | Réinitialiser mot de passe via token |
| Visiteur | POST | /admin/etudiants-autorises/importer | EtudiantAutoriseController@importer | non | non | Import CSV/XLS des étudiants autorisés (route définie publique) |
| Visiteur | GET | /stats-publiques | MemoireController@statsPubliques | non | non | Statistiques publiques (mémoires déposés, filières, etc.) |
| Visiteur | GET | /recherche-globale | RechercheController@index | non | non | Recherche rapide (mémoires, filières, sous‑filieres) |
| Visiteur | GET | /recherche/memoires | MemoireController@rechercherPublic | non | non | Recherche filtrée des mémoires publics |
| Visiteur | GET | /memoires/publics/{memoire} | MemoireController@afficherPublic | non | non | Afficher détail mémoire public |
| Visiteur | GET | /memoires/{memoire}/fichier | MemoireController@fichierPublic | non | non | Aperçu/stream du fichier public |
| Visiteur | GET | /memoires/{memoire}/telecharger | MemoireController@telechargerPublic | non | non | Télécharger fichier mémoire public |
| Visiteur | GET | /filieres | FiliereController@index | non | non | Lister filières publiques |
| Visiteur | GET | /sous-filieres | SousFiliereController@index | non | non | Lister sous‑filières publiques |
| Visiteur | GET | /memoires/{memoire}/apercu | MemoireController@apercuPublic | non | non | Récupérer l'aperçu image public |
| Visiteur | GET | /memoires/plus-consultes | MemoireController@plusConsultesPublic | non | non | Top mémoires les plus consultés |
| Visiteur | GET | /actualites | ActualiteController@index | non | non | Lister actualités publiques |
| Utilisateur | POST | /auth/logout | AuthController@logout | oui | non | Déconnexion (supprime token) |
| Utilisateur | GET | /auth/me | AuthController@me | oui | non | Récupérer profil utilisateur |
| Utilisateur | PUT/POST | /auth/mot-de-passe | AuthController@changerMotDePasse | oui | non | Changer mot de passe connecté |
| Utilisateur | GET | /memoires/mes-memoires | MemoireController@mesMemoires | oui | non | Lister ses mémoires déposés |
| Utilisateur | GET | /mes-memoires/{memoire}/fichier/{type} | MemoireController@monFichier | oui | non | Récupérer fichier (memoire/preuve) si propriétaire |
| Utilisateur | GET | /mes-memoires/{memoire}/telecharger/{type} | MemoireController@monTelechargement | oui | non | Télécharger fichier (memoire/preuve) si propriétaire |
| Utilisateur | POST | /memoires | MemoireController@store | oui | non | Déposer un nouveau mémoire |
| Utilisateur | PUT | /memoires/{memoire} | MemoireController@update | oui | non | Mettre à jour son mémoire (si non validé) |
| Utilisateur | DELETE | /memoires/{memoire} | MemoireController@destroy | oui | non | Supprimer son mémoire (si en attente) |
| Admin | GET | /admin/memoires/en-attente | MemoireController@enAttenteAdmin | oui | oui | Lister mémoires en attente de validation |
| Admin | GET | /admin/memoires | MemoireController@tousAdmin | oui | oui | Lister tous les mémoires (pagination) |
| Admin | POST | /admin/memoires | MemoireController@storeAdmin | oui | oui | Créer un mémoire (admin publié directement) |
| Admin | GET | /admin/memoires/{memoire}/fichier/{type} | MemoireController@fichierAdmin | oui | oui | Récupérer fichier d'un mémoire (admin) |
| Admin | POST | /admin/memoires/{memoire}/valider | MemoireController@valider | oui | oui | Valider et publier un mémoire |
| Admin | POST | /admin/memoires/{memoire}/rejeter | MemoireController@rejeter | oui | oui | Rejeter un mémoire avec motif |
| Admin | DELETE | /admin/memoires/{memoire} | MemoireController@supprimerAdmin | oui | oui | Supprimer définitivement un mémoire |
| Admin | GET | /admin/recherche-globale | AdminRechercheController@index | oui | oui | Recherche interne admin (mémoires/étudiants/filieres) |
| Admin | GET | /admin/memoires/{memoire} | MemoireController@showAdmin | oui | oui | Voir détail d'un mémoire (admin) |
| Admin | GET | /admin/etudiants-autorises | EtudiantAutoriseController@index | oui | oui | Lister étudiants autorisés (admin) |
| Admin | POST | /admin/etudiants-autorises | EtudiantAutoriseController@store | oui | oui | Ajouter un étudiant autorisé |
| Admin | GET | /admin/etudiants-autorises/{id} | EtudiantAutoriseController@show | oui | oui | Voir détails étudiant autorisé |
| Admin | PUT/PATCH | /admin/etudiants-autorises/{id} | EtudiantAutoriseController@update | oui | oui | Mettre à jour étudiant autorisé |
| Admin | DELETE | /admin/etudiants-autorises/{id} | EtudiantAutoriseController@destroy | oui | oui | Supprimer étudiant autorisé (si pas de compte actif) |
| Admin | POST | /admin/actualites | ActualiteController@store | oui | oui | Créer une actualité (admin) |
| Admin | PUT/PATCH | /admin/actualites/{id} | ActualiteController@update | oui | oui | Mettre à jour actualité |
| Admin | DELETE | /admin/actualites/{id} | ActualiteController@destroy | oui | oui | Supprimer actualité |
| Admin | POST | /admin/filieres | FiliereController@store | oui | oui | Créer filière |
| Admin | PUT/PATCH | /admin/filieres/{id} | FiliereController@update | oui | oui | Mettre à jour filière |
| Admin | DELETE | /admin/filieres/{id} | FiliereController@destroy | oui | oui | Supprimer filière |
| Admin | POST | /admin/sous-filieres | SousFiliereController@store | oui | oui | Créer sous‑filière |
| Admin | PUT/PATCH | /admin/sous-filieres/{id} | SousFiliereController@update | oui | oui | Mettre à jour sous‑filière |
| Admin | DELETE | /admin/sous-filieres/{id} | SousFiliereController@destroy | oui | oui | Supprimer sous‑filière |


> Note: certaines routes (ex: `/admin/etudiants-autorises/importer` et `/admin/stats`) sont définies hors du groupe `auth` dans `routes/api.php` — vérifier si c'est voulu.
