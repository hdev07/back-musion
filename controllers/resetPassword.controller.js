import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { promisify } from "util";
import { sendEmail } from "../services/emailService.js";
import { User } from "../models/user.js";

const readFileAsync = promisify(fs.readFile);

export const sendConfirmationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Busca el usuario en la base de datos por el correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "El correo electrónico no está registrado" });
    }

    const confirmationToken = uuidv4();
    user.confirmationToken = confirmationToken;
    await user.save();

    const template = await readFileAsync(
      "./email-templates/confirmation.html",
      "utf-8"
    );
    const confirmationLink = `https://app.musion.day/confirm?token=${confirmationToken}`;
    const emailContent = template
      .replace("{{confirmationLink}}", confirmationLink)
      .replace("{{userName}}", user.name);

    await sendEmail(email, "Confirmación de correo electrónico", emailContent);

    res.status(200).json({
      msg: "Se ha enviado un correo electrónico de confirmación",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al enviar el correo electrónico de confirmación",
    });
  }
};

export const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Busca el usuario en la base de datos por el correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "El correo electrónico no está registrado" });
    }

    const resetToken = uuidv4();
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hora de expiración del token
    await user.save();

    const template = await readFileAsync(
      "./email-templates/reset-password.html",
      "utf-8"
    );
    const resetLink = `https://app.musion.day/reset-password?token=${resetToken}`;
    const emailContent = template
      .replace("{{resetLink}}", resetLink)
      .replace("{{userName}}", user.name);

    await sendEmail(email, "Restablecimiento de contraseña", emailContent);

    res.status(200).json({
      msg: "Se ha enviado un correo electrónico para restablecer la contraseña",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Ha ocurrido un error al solicitar el restablecimiento de contraseña",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Busca el usuario en la base de datos por el token de restablecimiento de contraseña y verifica si es válido
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        msg: "El token de restablecimiento de contraseña no es válido o ha expirado",
      });
    }

    // Actualiza la contraseña del usuario y borra el token y la fecha de vencimiento
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ msg: "La contraseña se ha restablecido correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Ha ocurrido un error al restablecer la contraseña" });
  }
};
