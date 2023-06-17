import { Router } from "express";
import {
  getReviews,
  getAllReviews,
  getReviewsByIdMuseum,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByIdUser,
} from "../controllers/review.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  paramIdValidator,
  queryPaginationValidator,
  queryRatingValidator,
  querySearchValidator,
  validatorBodyReview,
} from "../middlewares/validatorManager.js";

const router = Router();

// GET    /reviews/           - get reviews with pag/museum/rating/comment
// GET    /reviews/all        - get all reviews
// GET    /reviews/museum/:id - get all reviews for id museum
// GET    /reviews/user/:id   - get all reviews for id user
// GET    /reviews/:id        - get one review
// POST   /reviews/           - create review
// PATCH  /reviews/:id        - update review
// DELETE /reviews/:id        - delete review

router.get(
  "/",
  requireToken,
  queryPaginationValidator,
  queryRatingValidator,
  querySearchValidator,
  getReviews
);
router.get("/all", requireToken, getAllReviews);
router.get("/museum/:id", requireToken, paramIdValidator, getReviewsByIdMuseum);
router.get("/user/:id", requireToken, paramIdValidator, getReviewsByIdUser);
router.get("/:id", requireToken, paramIdValidator, getReviewById);
router.post("/", requireToken, validatorBodyReview, createReview);
router.patch(
  "/:id",
  requireToken,
  paramIdValidator,
  validatorBodyReview,
  updateReview
);
router.delete("/:id", requireToken, paramIdValidator, deleteReview);

export default router;
