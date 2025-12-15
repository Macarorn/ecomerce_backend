// orden_producto.controller.js - CORREGIDO
import { conn } from "../connection/conn.js";

// GET /rest/v1/orden-producto → Listar productos en órdenes
export const getOrdenProductos = async (req, res) => {
  try {
    const { data, error } = await conn
      .from("Orden_Producto")  // <-- CAMBIADO de "orden_producto" a "Orden_Producto"
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /rest/v1/orden-producto → Agregar producto a orden
export const createOrdenProducto = async (req, res) => {
  const { orden_id, producto_id, cantidad, precio_unitario } = req.body;

  try {
    const { data, error } = await conn
      .from("Orden_Producto")  // <-- CAMBIADO AQUÍ
      .insert({
        orden_id,
        producto_id,
        cantidad,
        precio_unitario
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Producto agregado a la orden',
      id: data[0]?.id,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /rest/v1/orden-producto/:id → Actualizar cantidad o precio
export const updateOrdenProducto = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precio_unitario } = req.body;

  try {
    const { error } = await conn
      .from("Orden_Producto")  // <-- CAMBIADO AQUÍ
      .update({ cantidad, precio_unitario })
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Producto de la orden actualizado' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /rest/v1/orden-producto/:id → Eliminar producto de la orden
export const deleteOrdenProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await conn
      .from("Orden_Producto")  // <-- CAMBIADO AQUÍ
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Producto eliminado de la orden' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};