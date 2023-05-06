import { Museum } from "../models/museum.js";

export const getMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();

    return res.json({ museums });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const getMuseumById = async (req, res) => {
  try {
    const { id } = req.params;
    const museum = await Museum.findById(id);

    if (!museum) {
      return res.status(404).json({ error: "Museo no encontrado" });
    }

    return res.json({ museum });
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ error: "Formato de id incorrecto" });

    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const createMuseums = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      category,
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

    const museum = new Museum({
      name,
      description,
      image,
      category,
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
        freeSunday: priceRange.freeSunday,
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

    await museum.save();

    return res.status(201).json({ museum });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateMuseumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      image,
      category,
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

    const museum = await Museum.findById(id);

    if (!museum) {
      return res.status(404).json({ error: "Museo no encontrado" });
    }

    (museum.name = name),
      (museum.description = description),
      (museum.image = image),
      (museum.category = category),
      (museum.coordinates = {
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      (museum.address = {
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      }),
      (museum.telephone = telephone),
      (museum.url = url),
      (museum.openingHours = [...openingHours]),
      (museum.priceRange = {
        freeSunday: priceRange.freeSunday,
        general: priceRange.general,
        student: priceRange.student,
        inapam: priceRange.inapam,
      }),
      (museum.review = {
        reviewRating: {
          ratingValue: review.reviewRating.ratingValue,
          bestRating: review.reviewRating.bestRating,
          worstRating: review.reviewRating.worstRating,
          author: review.reviewRating.author,
          datePublished: review.reviewRating.datePublished,
          description: review.reviewRating.description,
        },
      }),
      (museum.travelTime = travelTime),
      (museum.stayTime = stayTime),
      await museum.save();

    return res.status(200).json({ message: "Museo actualizado" });
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ error: "Formato de id incorrecto" });

    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteMuseumById = async (req, res) => {
  try {
    const { id } = req.params;
    const museum = await Museum.findByIdAndDelete(id);

    if (!museum) {
      return res.status(404).json({ error: "Museo no encontrado" });
    }

    return res.json({ message: "Museo eliminado" });
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json({ error: "Formato de id incorrecto" });

    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
