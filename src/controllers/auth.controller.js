import bcrypt from "bcrypt";
import { conn } from "../connection/conn.js";

// Login de usuario
export const loginUser = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const { data, error } = await conn
      .from("Usuarios")
      .select("*")
      .eq("correo", correo)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, data.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: data.id,
        correo: data.correo,
        nombre: data.nombre,
        apellido: data.apellido,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
