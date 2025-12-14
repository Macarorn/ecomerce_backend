const { v4: uuidv4 } = require('uuid');
const { categorias } = require('../../../tienda-backend/src/services/db');

function getCategorias(req, res) {
  return res.json(categorias);
}

function getCategoriaById(req, res) {
  const { id } = req.params;
  const cat = categorias.find((c) => c.id === id);
  if (!cat) return res.status(404).json({ error: 'Categoría no encontrada' });
  return res.json(cat);
}

function createCategoria(req, res) {
  const { nombre, descripcion } = req.body || {};
  if (!nombre) return res.status(400).json({ error: 'El campo nombre es requerido' });
  const nueva = { id: uuidv4(), nombre, descripcion: descripcion || '' };
  categorias.push(nueva);
  return res.status(201).json(nueva);
}

function updateCategoria(req, res) {
  const { id } = req.params;
  const { nombre, descripcion } = req.body || {};
  const idx = categorias.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Categoría no encontrada' });
  categorias[idx] = {
    ...categorias[idx],
    nombre: nombre ?? categorias[idx].nombre,
    descripcion: descripcion ?? categorias[idx].descripcion,
  };
  return res.json(categorias[idx]);
}

function deleteCategoria(req, res) {
  const { id } = req.params;
  const idx = categorias.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Categoría no encontrada' });
  const removed = categorias.splice(idx, 1)[0];
  return res.json(removed);
}

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
