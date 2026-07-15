import { apiClient } from "../../../lib/apiClient";

// GET /api/memoires/mes-memoires
export async function getMesMemoires() {
  const { data } = await apiClient.get("/memoires/mes-memoires");
  return data;
}

// GET /api/memoires/{id} — route à ajouter côté backend
export async function getMemoireById(id) {
  const { data } = await apiClient.get(`/memoires/${id}`);
  return data;
}

// POST /api/memoires
export async function creerMemoire(formData) {
  const { data } = await apiClient.post("/memoires", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

// PUT /api/memoires/{id} — route à ajouter côté backend
export async function modifierMemoire(id, formData) {
  formData.append("_method", "PUT");
  const { data } = await apiClient.post(`/memoires/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}