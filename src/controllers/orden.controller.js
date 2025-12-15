// orden.controller.js - CORREGIDO
import { conn } from "../connection/conn.js";

// GET /rest/v1/orden → Listar órdenes
export const getOrdenes = async (req, res) => {
  try {
    const { data, error } = await conn
      .from("Orden")  // <-- CAMBIADO de "orden" a "Orden"
      .select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /rest/v1/orden/:id → Obtener orden por id
export const getOrdenById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await conn
      .from("Orden")  // <-- CAMBIADO AQUÍ
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /rest/v1/orden → Crear orden
export const createOrden = async (req, res) => {
  const { usuario_id, fecha, estado, total } = req.body;

  try {
    const { data, error } = await conn
      .from("Orden")  // <-- CAMBIADO AQUÍ
      .insert({
        usuario_id,
        fecha: new Date().toISOString(),
        estado,
        total,
      })
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Orden creada correctamente',
      orden_id: data[0]?.id,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /rest/v1/orden/:id → Actualizar estado o total
export const updateOrden = async (req, res) => {
  const { id } = req.params;
  const { total, estado } = req.body;

  try {
    const { error } = await conn
      .from("Orden")  // <-- CAMBIADO AQUÍ
      .update({ total, estado })
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Orden actualizada correctamente' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// En orden.controller.js - MODIFICA la función deleteOrden
export const deleteOrden = async (req, res) => {
  const { id } = req.params;

  try {
    // PRIMERO: Eliminar todos los productos asociados a esta orden
    const { error: errorProductos } = await conn
      .from("Orden_Producto")
      .delete()
      .eq("orden_id", id);

    if (errorProductos) {
      return res.status(400).json({ error: errorProductos.message });
    }

    // SEGUNDO: Eliminar la orden
    const { error } = await conn
      .from("Orden")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ 
      message: 'Orden y sus productos eliminados correctamente' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};