import { User } from "../models/user.js";

// Controlador para obtener información del usuario logueado
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.uid;
    console.log("req :>> ", req.uid);

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
    console.error(error);
    res
      .status(500)
      .json({ msg: "Error al obtener la información del usuario" });
  }
};
