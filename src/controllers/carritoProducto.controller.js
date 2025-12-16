import { conn } from "../connection/conn.js";

// Listar todos los productos en carritos
export const getCarritoProductos = async (req, res) => {
  try {
    const { data, error } = await conn
      .from("Carrito_Producto")
      .select("id, carrito_id, producto_id, cantidad");
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar producto al carrito
export const createCarritoProducto = async (req, res) => {
  const { carrito_id, producto_id, cantidad } = req.body;
  if (carrito_id == null || producto_id == null || cantidad == null)
    return res.status(400).json({ error: "carrito_id, producto_id y cantidad son requeridos" });

  const carritoIdNum = parseInt(carrito_id, 10);
  const productoIdNum = parseInt(producto_id, 10);
  const cantidadNum = parseInt(cantidad, 10);

  if (isNaN(carritoIdNum) || isNaN(productoIdNum) || isNaN(cantidadNum))
    return res.status(400).json({ error: "carrito_id, producto_id y cantidad deben ser enteros" });

  try {
    // Verificar existencia de carrito
    const { data: carritoData, error: carritoError } = await conn
      .from("Carrito")
      .select("id")
      .eq("id", carritoIdNum)
      .limit(1);
    if (carritoError) return res.status(400).json({ error: carritoError.message });
    if (!carritoData || carritoData.length === 0)
      return res.status(400).json({ error: "carrito_id no existe" });

    // Verificar existencia de producto
    const { data: productoData, error: productoError } = await conn
      .from("Productos")
      .select("id")
      .eq("id", productoIdNum)
      .limit(1);
    if (productoError) return res.status(400).json({ error: productoError.message });
    if (!productoData || productoData.length === 0)
      return res.status(400).json({ error: "producto_id no existe" });

    const { data, error } = await conn
      .from("Carrito_Producto")
      .insert({ carrito_id: carritoIdNum, producto_id: productoIdNum, cantidad: cantidadNum });
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "Producto agregado al carrito", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cantidad
export const updateCarritoProducto = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  if (cantidad == null) return res.status(400).json({ error: "cantidad es requerida" });
  try {
    const { data, error } = await conn
      .from("Carrito_Producto")
      .update({ cantidad })
      .eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Cantidad actualizada", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto del carrito
export const deleteCarritoProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await conn.from("Carrito_Producto").delete().eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Producto eliminado del carrito", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
