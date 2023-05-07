import { User } from "../models/user.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    return res.status(500).json({ msg: "Error on server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Usuaeario no encontrado" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Correo o contraseña incorrectos" });
    }

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ msg: "Error on server" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ msg: "Error on server" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({ msg: "Logout exitoso" });
  } catch (error) {
    return res.status(500).json({ msg: "Error on server" });
  }
};
