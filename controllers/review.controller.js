import { Review } from "../models/review.js";
import { Museum } from "../models/museum.js";
import { User } from "../models/user.js";

// Obtener todas las reviews en listado con filtros
export const getReviews = async (req, res) => {
  try {
    const { page = 1, museum, rating, comment } = req.query;
    const limit = 25;
    let query = {};

    // Agregar filtro de búsqueda por nombre del museo
    if (museum) {
      const museumObj = await Museum.findOne({
        name: { $regex: museum, $options: "i" },
      });
      if (museumObj) {
        query.museum = museumObj._id;
      }
    }

    // Agregar filtro de búsqueda por rating
    if (rating) {
      query.rating = rating;
    }

    // Agregar filtro de bésqueda por comentario
    if (comment) {
      query.comment = { $regex: comment, $options: "i" };
    }

    // Obtener el número total de resultados
    const count = await Review.countDocuments(query);
    const totalPages = Math.ceil(count / limit);

    // Obtener las reviews que coinciden con los criterios de búsqueda
    const reviews = await Review.find(query)
      .populate({
        path: "user",
        select: "id name registration_date",
      })
      .populate({
        path: "museum",
        select: "id name rating",
      })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json({
      total: count,
      currentPage: parseInt(page),
      perPage: parseInt(limit),
      lastPage: totalPages,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reviews" });
  }
};

// Obtener todas las reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate({
        path: "user",
        select: "id name registration_date",
      })
      .populate({
        path: "museum",
        select: "id name rating",
      });
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reviews" });
  }
};

// Obtener todas las reviews de un museo por su ID
export const getReviewsByIdMuseum = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ museum: id })
      .populate({
        path: "user",
        select: "id name registration_date",
      })
      .populate({
        path: "museum",
        select: "id name rating",
      });
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reviews del museo" });
  }
};

// Obtener una review por su ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id)
      .populate("user")
      .populate("museum");

    if (!review) {
      res.status(404).json({ error: "Review no encontrada" });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la review" });
  }
};

// Obtener todas las reviews de un usuario
export const getReviewsByIdUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Obtener las reviews del usuario
    const reviews = await Review.find({ user: id })
      .populate({
        path: "user",
        select: "id name registration_date",
      })
      .populate({
        path: "museum",
        select: "id name rating",
      });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener las reviews del usuario" });
  }
};

// Crear una nueva review
export const createReview = async (req, res) => {
  try {
    const { museum, rating, comment } = req.body;

    // Obtener el ID del usuario actual desde la autenticación o sesión
    const userId = req.uid; // Modifica esto según cómo obtengas el ID del usuario

    // Verificar si el museo existe
    const existingMuseum = await Museum.findById(museum);
    if (!existingMuseum) {
      return res.status(404).json({ msg: "Museo no encontrado" });
    }

    const newReview = await Review.create({
      user: userId,
      museum,
      rating,
      comment,
    });

    // Añadir la nueva review al array de reviews del museo
    existingMuseum.reviews.push(newReview);

    // Actualizar el rating del museo
    const existingReviews = await Review.find({ museum });
    const totalRating = existingReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRating / existingReviews.length;
    existingMuseum.rating = {
      average: averageRating,
      total: totalRating,
      count: existingReviews.length,
    };

    // Guardar los cambios en el museo
    await existingMuseum.save();

    res.status(201).json({ msg: "Review creada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear la review" });
  }
};

// Actualizar una review existente
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.uid; // ID del usuario actual

    const review = await Review.findById(id).populate("user museum");

    if (!review) {
      res.status(404).json({ msg: "Review no encontrada" });
    } else if (review.user.toString() !== userId) {
      res
        .status(401)
        .json({ msg: "No tienes permisos para actualizar esta review" });
    } else {
      review.rating = rating;
      review.comment = comment;
      await review.save();

      // Actualizar el rating del museo
      const existingReviews = await Review.find({ museum: review.museum });
      const totalRating = existingReviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / existingReviews.length;
      review.museum.rating = {
        average: averageRating,
        total: totalRating,
        count: existingReviews.length,
      };
      await review.museum.save();

      res.status(200).json({ msg: "Review actualizada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la review" });
  }
};

// Eliminar una review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.uid; // ID del usuario actual

    const review = await Review.findById(id).populate("user museum");

    if (!review) {
      res.status(404).json({ msg: "Review no encontrada" });
    } else if (review.user.toString() !== userId) {
      res
        .status(401)
        .json({ msg: "No tienes permisos para eliminar esta review" });
    } else {
      await review.delete();

      // Actualizar el rating del museo
      const existingReviews = await Review.find({ museum: review.museum });
      const totalRating = existingReviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / existingReviews.length;
      review.museum.rating = {
        average: averageRating,
        total: totalRating,
        count: existingReviews.length,
      };
      await review.museum.save();

      res.status(200).json({ msg: "Review eliminada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la review" });
  }
};
