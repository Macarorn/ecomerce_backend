import { conn } from "../connection/conn.js";

// Listar todos los carritos
export const getCarritos = async (req, res) => {
  try {
    const { data, error } = await conn.from("Carrito").select("id, usuario_id, estado");
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un carrito por id
export const getCarrito = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);
  if (isNaN(idNum)) return res.status(400).json({ error: "id debe ser un entero" });
  try {
    const { data, error } = await conn
      .from("Carrito")
      .select("id, usuario_id, estado")
      .eq("id", idNum)
      .limit(1);
    if (error) return res.status(400).json({ error: error.message });
    // si no se encuentra, devolver 404
    if (!data || data.length === 0) return res.status(404).json({ error: "Carrito no encontrado" });
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un carrito
export const createCarrito = async (req, res) => {
  const { usuario_id, estado } = req.body;
  if (usuario_id == null) return res.status(400).json({ error: "usuario_id es requerido" });
  const usuarioIdNum = parseInt(usuario_id, 10);
  if (isNaN(usuarioIdNum)) return res.status(400).json({ error: "usuario_id debe ser un entero" });
  try {
    // Verificar que el usuario exista para no violar FK
    const { data: userData, error: userError } = await conn
      .from("Usuarios")
      .select("id")
      .eq("id", usuarioIdNum)
      .limit(1);
    if (userError) return res.status(400).json({ error: userError.message });
    if (!userData || userData.length === 0)
      return res.status(400).json({ error: "usuario_id no existe" });

    const { data, error } = await conn.from("Carrito").insert({ usuario_id: usuarioIdNum, estado: estado || "activo" });
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "Carrito creado", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado del carrito
export const updateCarrito = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  if (!estado) return res.status(400).json({ error: "estado es requerido" });
  try {
    const { data, error } = await conn.from("Carrito").update({ estado }).eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Carrito actualizado", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un carrito
export const deleteCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await conn.from("Carrito").delete().eq("id", id);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "Carrito eliminado", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
