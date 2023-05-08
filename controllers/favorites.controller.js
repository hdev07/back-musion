import mongoose from "mongoose";
import { User } from "../models/user.js";
import { Museum } from "../models/museum.js";

export const getFavorites = async (req, res) => {
  const userId = req.uid;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(userId).populate("favoritesMuseums");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ favorites: user.favoritesMuseums });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los museos favoritos" });
  }
};

export const addToFavorites = async (req, res) => {
  const { museumId } = req.body;
  const userId = req.uid;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el museo existe
    if (!mongoose.isValidObjectId(museumId)) {
      return res.status(400).json({ error: "ID de museo inválido" });
    }

    const museum = await Museum.findById(museumId);
    if (!museum) {
      return res.status(404).json({ error: "Museo no encontrado" });
    }

    // Verificar si el museo ya está en la lista de favoritos
    if (user.favoritesMuseums.includes(museumId)) {
      return res
        .status(400)
        .json({ error: "El museo ya está en la lista de favoritos" });
    }

    // Agregar el museo a la lista de favoritos del usuario
    user.favoritesMuseums.push(museumId);
    await user.save();

    res.status(200).json({ message: "Museo agregado a favoritos" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el museo a favoritos" });
  }
};

export const removeFromFavorites = async (req, res) => {
  const { id: museumId } = req.params;
  const userId = req.uid;
  console.log(museumId);

  try {
    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el museo está en la lista de favoritos del usuario
    if (!user.favoritesMuseums.includes(museumId)) {
      return res
        .status(404)
        .json({ error: "El museo no está en la lista de favoritos" });
    }

    const museum = await Museum.findById(museumId);
    if (!museum) {
      return res.status(404).json({ error: "Museo no encontrado" });
    }

    // Eliminar el museo de la lista de favoritos del usuario
    user.favoritesMuseums = user.favoritesMuseums.filter(
      (id) => id.toString() !== museumId
    );
    await user.save();

    res.status(200).json({ message: "Museo eliminado de favoritos" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el museo de favoritos" });
  }
};
