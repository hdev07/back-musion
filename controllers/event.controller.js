import { Event } from "../models/event.js";

// Obtener todos los eventos
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("museum");
    res.json({ events });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los eventos", error });
  }
};

// Obtener todos los eventos por un museo
export const getEventsByIdMuseum = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Event.find({ museum: id });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los eventos del museo" });
  }
};

// Obtener un evento por su ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate("museum");
    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el evento", error });
  }
};

// Crear un nuevo evento
export const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const event = await Event.create(eventData);
    res.status(201).json({ event });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el evento", error });
  }
};

// Actualizar un evento existente
export const updateEventById = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;
  try {
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true });
    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el evento", error });
  }
};

// Eliminar un evento existente
export const deleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }
    res.json({ msg: "Evento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el evento", error });
  }
};
