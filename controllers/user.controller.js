import { User } from "../models/user.js";

// Controlador para obtener información del usuario logueado
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.uid;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      visitedMuseums: user.visitedMuseums,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al obtener la información del usuario" });
  }
};

// Controlador para desactivar la cuenta del usuario
export const deactivateAccount = async (req, res) => {
  try {
    const userId = req.uid;

    // Buscar al usuario en la base de datos
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Desactivar la cuenta del usuario
    user.activeAccount = false;
    await user.save();

    res.status(200).json({ msg: "La cuenta ha sido eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al desactivar la cuenta del usuario" });
  }
};

// Controlador para cambiar la contraseña del usuario
export const changePassword = async (req, res) => {
  try {
    const userId = req.uid;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Verificar la contraseña actual del usuario
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ msg: "La contraseña actual es incorrecta" });
    }

    // Actualizar la contraseña del usuario
    user.password = newPassword;
    await user.save();

    res.status(200).json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al cambiar la contraseña del usuario" });
  }
};
