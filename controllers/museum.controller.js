import { Museum } from "../models/museum.js";

export const getMuseums = async (req, res) => {
  try {
    const { page = 1, search, categories } = req.query;
    const limit = 25;

    let query = {};

    // Agrega filtro de búsqueda por nombre
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Agrega filtro de búsqueda por categorías
    if (categories) {
      const categoryList = categories.split(",");
      if (categoryList.includes("Sin categoría")) {
        query.$or = [
          { category: { $in: categoryList } },
          { category: { $exists: false } },
          { category: "" },
        ];
      } else {
        query.category = { $in: categoryList };
      }
    }

    // Obtiene el número total de resultados
    const count = await Museum.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    // Obtiene los museos que coinciden con los criterios de búsqueda
    const museums = await Museum.find(query)
      .select("id name description category address review coordinates")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    // Enviar la respuesta con los resultados
    res.status(200).json({
      total: count,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      lastPage: totalPages,
      museums,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los museos" });
  }
};

// Obtener todos los museos
export const getAllMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();
    res.status(200).json(museums);
  } catch (error) {
    res.status(500).json({ msg: "Error en al obtener los museos" });
  }
};

// Obtener un museo por ID
export const getMuseumById = async (req, res) => {
  try {
    const { id } = req.params;
    const museum = await Museum.findById(id);

    if (museum) {
      res.status(200).json(museum);
    } else {
      res.status(404).json({ msg: "Museo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el museo" });
  }
};

// Crear un nuevo museo
export const createMuseum = async (req, res) => {
  try {
    const museumData = req.body;

    const museum = await Museum.create(museumData);
    res.status(201).json(museum);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear el museo" });
  }
};

// Actualizar un museo existente
export const updateMuseum = async (req, res) => {
  try {
    const { id } = req.params;
    const museumData = req.body;

    const museum = await Museum.findByIdAndUpdate(id, museumData, {
      new: true,
    });
    if (museum) {
      res.status(200).json(museum);
    } else {
      res.status(404).json({ msg: "Museo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el museo" });
  }
};

// Eliminar un museo
export const deleteMuseum = async (req, res) => {
  try {
    const { id } = req.params;
    const museum = await Museum.findByIdAndDelete(id);

    if (!museum) {
      res.status(404).json({ msg: "Museo no encontrado" });
    } else {
      res.status(200).json({ msg: "Museo eliminado correctamente" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error eliminar el museo" });
  }
};

// Obtener las categorías de los museos
export const getCategoriesWithCounts = async (req, res) => {
  try {
    const categories = await Museum.distinct("category");
    const categoryCounts = await Museum.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const categoryData = categories.map((category) => {
      const count =
        categoryCounts.find((item) => item._id === category)?.count || 0;
      return { category, count };
    });

    return res.status(200).json({ categories: categoryData });
  } catch (error) {
    return res.status(500).json({ msg: "Ocurrió un error en el servidor" });
  }
};
