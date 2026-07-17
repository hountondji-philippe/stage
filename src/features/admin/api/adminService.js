import { apiClient } from '../../../lib/apiClient';

// --- Gestion des Mémoires ---
export const getMemoiresEnAttente = () => apiClient.get('/admin/memoires/en-attente');
export const getAllMemoires = ({ statut, page } = {}) =>
  apiClient.get('/admin/memoires', { params: { statut: statut || undefined, page } });
export const validerMemoire = (id) => apiClient.post(`/admin/memoires/${id}/valider`);
export const rejeterMemoire = (id, data) => apiClient.post(`/admin/memoires/${id}/rejeter`, data);
export const supprimerMemoire = (id) => apiClient.delete(`/admin/memoires/${id}`);

// --- Gestion Filières ---
// ⚠️ Route::apiResource('/admin/filieres', ...)->except(['index', 'show'])
// exclut justement l'index côté admin. On utilise la route PUBLIQUE
// GET /api/filieres (FiliereController::index) pour lister.
export const getFiliereList = () => apiClient.get('/filieres');
export const createFiliere = (data) => apiClient.post('/admin/filieres', data);
export const updateFiliere = (id, data) => apiClient.put(`/admin/filieres/${id}`, data);
export const deleteFiliere = (id) => apiClient.delete(`/admin/filieres/${id}`);

// --- Gestion Sous-Filières ---
export const getSousFilieres = () => apiClient.get('/admin/sous-filieres');
export const createSousFiliere = (data) => apiClient.post('/admin/sous-filieres', data);

// --- Gestion Étudiants ---
export const getEtudiants = () => apiClient.get('/admin/etudiants-autorises');
export const addEtudiantAutorise = (data) => apiClient.post('/admin/etudiants-autorises', data);
export const deleteEtudiant = (id) => apiClient.delete(`/admin/etudiants-autorises/${id}`);

// --- Visionneuse PDF (fichier protégé par token → on fetch en blob) ---
export const getMemoireFichierBlob = (id, type) =>
  apiClient.get(`/admin/memoires/${id}/fichier/${type}`, { responseType: "blob" });

// --- Statistiques globales ---
export const getStats = () => apiClient.get('/admin/stats');
