import bcrypt from "bcrypt";
import { conn } from "../connection/conn.js";

//Funciones para consultar a todos los usuarios y a uno en específico
export const getUsers = async (req, res) => {
  const { data, error } = await conn
    .from("Usuarios")
    .select("id, nombre, correo, password");
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

//Ahora para solo un usuario
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await conn
      .from("Usuarios")
      .select("id, nombre, correo, password")
      .eq("id", id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Funcion para crear un usuario
export const createUser = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = await conn.from("Usuarios").insert({
      nombre: nombre,
      correo: correo,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Usuario creado", data: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Fucnion para actualizar a un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, password } = req.body;
  try {
    let updateFields = { nombre, correo };
    if (password) {
      const saltRounds = 10;
      updateFields.password = await bcrypt.hash(password, saltRounds);
    }
    const { data } = await conn
      .from("Usuarios")
      .update(updateFields)
      .eq("id", id);
    res.status(200).json({ message: "Usuario actualizado", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { data } = await conn.from("Usuarios").delete().eq("id", id);
    res.status(200).json({ message: "Usuario eliminado", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
