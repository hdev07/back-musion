import { User } from "../models/user.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

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

    // Generar token jwt
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({ message: "Logout exitoso" });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};
