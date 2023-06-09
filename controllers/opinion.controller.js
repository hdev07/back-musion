import { Opinion } from "../models/opinion.js";

export const createOpinion = async (req, res) => {
  try {
    const { name, email, telephone, comment } = req.body;
    const opinion = new Opinion({
      name,
      email,
      telephone,
      comment,
    });

    await opinion.save();

    res.status(201).json({ opinion });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ msg: "Ocurrio un error en el servidor" });
  }
};

export const getOpinions = async (req, res) => {
  try {
    const opinions = await Opinion.find();
    res.status(200).json({ opinions });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un error en el servidor" });
  }
};

export const getOpinionById = async (req, res) => {
  try {
    const { id } = req.params;
    const opinion = await Opinion.findById(id);
    if (!opinion) {
      return res.status(404).json({ msg: "Testimonio no encontrado" });
    }
    res.status(200).json({ opinion });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un error en el servidor" });
  }
};

export const updateOpinion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, telephone, comment } = req.body;
    const updatedOpinion = await Opinion.findByIdAndUpdate(
      id,
      { name, email, telephone, comment },
      { new: true }
    );
    if (!updatedOpinion) {
      return res.status(404).json({ msg: "Testimonio no encontrado" });
    }
    res.status(200).json({ updatedOpinion });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un error en el servidor" });
  }
};

export const deleteOpinion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOpinion = await Opinion.findByIdAndDelete(id);
    if (!deletedOpinion) {
      return res.status(404).json({ msg: "Testimonio no encontrado" });
    }
    res.status(200).json({ msg: "Testimonio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Ocurrio un error en el servidor" });
  }
};
