import { categorias } from "../services/db.js";

let nextId = 1;

// GET /rest/v1/categorias
export function getCategorias(req, res) {
  res.json(categorias);
}

// GET /rest/v1/categorias/:id
export function getCategoriaById(req, res) {
  const id = Number(req.params.id);
  const categoria = categorias.find(c => c.id === id);

  if (!categoria) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  res.json(categoria);
}

// POST /rest/v1/categorias
export function createCategoria(req, res) {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const nuevaCategoria = {
    id: nextId++,
    nombre,
    descripcion: descripcion || ""
  };

  categorias.push(nuevaCategoria);
  res.status(201).json(nuevaCategoria);
}

// PUT /rest/v1/categorias/:id
export function updateCategoria(req, res) {
  const id = Number(req.params.id);
  const { nombre, descripcion } = req.body;

  const categoria = categorias.find(c => c.id === id);

  if (!categoria) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  if (nombre !== undefined) categoria.nombre = nombre;
  if (descripcion !== undefined) categoria.descripcion = descripcion;

  res.json(categoria);
}

// DELETE /rest/v1/categorias/:id
export function deleteCategoria(req, res) {
  const id = Number(req.params.id);
  const index = categorias.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  const eliminada = categorias.splice(index, 1)[0];
  res.json(eliminada);
}
