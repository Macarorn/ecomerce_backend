import { productos } from "../services/db.js";

let nextId = 1;

// GET /rest/v1/productos
export function getProductos(req, res) {
  res.json(productos);
}

// GET /rest/v1/productos/:id
export function getProductoById(req, res) {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
}

// POST /rest/v1/productos
export function createProducto(req, res) {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    imagen_url,
    categoria_id
  } = req.body;

  if (!nombre || precio === undefined || categoria_id === undefined) {
    return res.status(400).json({
      error: "nombre, precio y categoria_id son obligatorios"
    });
  }

  const nuevoProducto = {
    id: nextId++,
    nombre,
    descripcion: descripcion || "",
    precio,
    stock: stock || 0,
    imagen_url: imagen_url || "",
    categoria_id
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
}

// PUT /rest/v1/productos/:id
export function updateProducto(req, res) {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  Object.assign(producto, req.body);
  res.json(producto);
}

// DELETE /rest/v1/productos/:id
export function deleteProducto(req, res) {
  const id = Number(req.params.id);
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const eliminado = productos.splice(index, 1)[0];
  res.json(eliminado);
}
