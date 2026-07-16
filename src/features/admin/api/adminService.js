import { apiClient } from '../../../lib/apiClient';

// --- Gestion des Mémoires ---
export const getMemoiresEnAttente = () => apiClient.get('/admin/memoires/en-attente');
export const getAllMemoires = () => apiClient.get('/admin/memoires');
export const validerMemoire = (id) => apiClient.post(`/admin/memoires/${id}/valider`);
export const rejeterMemoire = (id, data) => apiClient.post(`/admin/memoires/${id}/rejeter`, data);
export const supprimerMemoire = (id) => apiClient.delete(`/admin/memoires/${id}`);

// --- Gestion Filières ---
export const getFiliereList = () => apiClient.get('/admin/filieres');
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