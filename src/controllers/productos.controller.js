const { v4: uuidv4 } = require('uuid');
const { productos, categorias } = require('../../../tienda-backend/src/services/db');

function getProductos(req, res) {
  return res.json(productos);
}

function getProductoById(req, res) {
  const { id } = req.params;
  const p = productos.find((p) => p.id === id);
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
  return res.json(p);
}

function createProducto(req, res) {
  const { nombre, descripcion, precio, categoriaId } = req.body || {};
  if (!nombre || precio == null) return res.status(400).json({ error: 'Campos requeridos: nombre, precio' });
  if (categoriaId && !categorias.find((c) => c.id === categoriaId)) return res.status(400).json({ error: 'categoriaId inválido' });
  const nuevo = { id: uuidv4(), nombre, descripcion: descripcion || '', precio: Number(precio), categoriaId: categoriaId || null };
  productos.push(nuevo);
  return res.status(201).json(nuevo);
}

function updateProducto(req, res) {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoriaId } = req.body || {};
  const idx = productos.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  if (categoriaId && !categorias.find((c) => c.id === categoriaId)) return res.status(400).json({ error: 'categoriaId inválido' });
  productos[idx] = {
    ...productos[idx],
    nombre: nombre ?? productos[idx].nombre,
    descripcion: descripcion ?? productos[idx].descripcion,
    precio: precio == null ? productos[idx].precio : Number(precio),
    categoriaId: categoriaId ?? productos[idx].categoriaId,
  };
  return res.json(productos[idx]);
}

function deleteProducto(req, res) {
  const { id } = req.params;
  const idx = productos.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  const removed = productos.splice(idx, 1)[0];
  return res.json(removed);
}

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
