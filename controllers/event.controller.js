import { Event } from "../models/event.js";
import { Museum } from "../models/museum.js";

// Obtener todos los eventos en listado con filtros
export const getEvents = async (req, res) => {
  try {
    const { page = 1, search, museum, startDate } = req.query;
    const limit = 25;

    let query = {};

    // Agregar filtro de búsqueda por nombre de evento (search)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Agregar filtro de búsqueda por nombre de museo (museum)
    if (museum) {
      const museumObj = await Museum.findOne({
        name: { $regex: museum, $options: "i" },
      });
      if (museumObj) {
        query.museum = museumObj._id;
      }
    }

    // Agregar filtro de bésqueda por fecha de inicio (startDate)
    if (startDate) {
      query.startDate = {
        $gte: new Date(startDate),
      };
    }

    // Obtener el número total de resultados
    const count = await Event.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    // Obtener los eventos que coinciden con los criterios de búsqueda
    const events = await Event.find(query)
      .populate("museum")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json({
      total: count,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      lastPage: totalPages,
      events,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los eventos" });
  }
};

// Obtener todos los eventos
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("museum");
    res.json({ events });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los eventos" });
  }
};

// Obtener un evento por ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({ msg: "Evento no encontrado" });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el evento" });
  }
};

// Obtener todos los eventos de un museo
export const getEventsByIdMuseum = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Event.find({ museum: id });

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los eventos del museo" });
  }
};

// Crear un nuevo evento
export const createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await Event.create(eventData);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el evento" });
  }
};

// Actualizar un evento existent
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;

    const event = await Event.findByIdAndUpdate(id, eventData, {
      new: true,
    });

    if (!event) {
      res.status(404).json({ msg: "Evento no encontrado" });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el evento" });
  }
};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      res.status(404).json({ msg: "Evento no encontrado" });
    } else {
      res.status(200).json({ msg: "Evento eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error eliminar el evento" });
  }
};
