import { Museum } from "../models/museums.js";

export const getMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();

    return res.json({ museums });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error del servidor" });
  }
};

export const createMuseums = async (req, res) => {
  try {
    // Extraemos los campos requeridos del body
    const {
      name,
      description,
      image,
      coordinates,
      address,
      telephone,
      url,
      openingHours,
      priceRange,
      review,
      travelTime,
      stayTime,
    } = req.body;

    // Creamos un nuevo objeto de tipo Museum con los campos requeridos
    const museum = new Museum({
      name,
      description,
      image,
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
      address: {
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      },
      telephone,
      url,
      openingHours: [...openingHours],
      priceRange: {
        general: priceRange.general,
        student: priceRange.studen,
        inapam: priceRange.inapam,
      },
      review: {
        reviewRating: {
          ratingValue: review.reviewRating.ratingValue,
          bestRating: review.reviewRating.bestRating,
          worstRating: review.reviewRating.worstRating,
          author: review.reviewRating.author,
          datePublished: review.reviewRating.datePublished,
          description: review.reviewRating.description,
        },
      },
      travelTime: travelTime,
      stayTime: stayTime,
    });

    // Guardamos el objeto en la base de datos
    await museum.save();

    // Devolvemos una respuesta con el objeto creado
    return res.json({ museum });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error del servidor" });
  }
};
