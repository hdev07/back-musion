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
    const confirmationLink = `https://app.musion.day/confirm-email?token=${confirmationToken}`;
    const emailContent = template
      .replace("{{confirmationLink}}", confirmationLink)
      .replace("{{userName}}", user.name);

    await sendEmail(email, "Confirmación de correo electrónico", emailContent);

    res.status(200).json({
      msg: "Se ha enviado un correo electrónico de confirmación",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al enviar el correo electrónico de confirmación",
    });
  }
};

export const confirmEmailToken = async (req, res) => {
  try {
    const { token } = req.params;

    // Buscar el usuario en la base de datos por el token de confirmación
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(404).json({ msg: "Token de confirmación inválido" });
    }

    // Marcar la cuenta del usuario como verificada
    user.emailVerified = true;
    user.confirmationToken = undefined;
    await user.save();

    res.status(200).json({ msg: "Cuenta verificada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al confirmar el correo electrónico" });
  }
};
