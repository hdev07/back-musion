import { User } from "../models/user.js";

export const checkEmailVerified = async (req, res, next) => {
  try {
    // Obtener el ID del usuario desde el token de autenticación
    const userId = req.uid;

    // Consultar la base de datos para obtener los datos del usuario
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Verificar si el correo electrónico ya está verificado
    if (user.emailVerified) {
      return res
        .status(400)
        .json({ msg: "El correo electrónico ya está verificado" });
    }

    // Verificar si el correo electrónico del usuario coincide con el correo proporcionado en la solicitud
    if (user.email !== req.body.email) {
      return res
        .status(400)
        .json({ msg: "La solicitud debe ser realizada por el mismo usuario" });
    }

    // Si el correo electrónico no está verificado y el usuario es válido, continuar con la ejecución
    next();
  } catch (error) {
    res.status(500).json({ msg: "Error al verificar el correo electrónico" });
  }
};
