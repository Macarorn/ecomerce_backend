import bcrypt from "bcrypt";
import { conn } from "../connection/conn.js";

// Crear un usuario
export const createUser = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const { data, error } = await conn.from("Auth").insert({
      nombre: nombre,
      contraseña: hashedPassword,
    });

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(201).json({ message: "Usuario creado exitosamente", data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recuperar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await conn
      .from("Auth")
      .select("id, nombre, created_at");

    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const { data, error } = await conn
      .from("Auth")
      .select("*")
      .eq("nombre", nombre)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, data.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: data.id,
        nombre: data.nombre,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
