import { User } from "../models/user.js";
import { generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });

    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    res.json({ token, expiresIn });

    return res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
    return res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    const { token, expiresIn } = generateToken(user.id);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al loguearse" });
  }
};
