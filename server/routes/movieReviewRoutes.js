const express = require("express");
const {
  addMovieReview,
  getMovieReviews,
  deleteMovieReview,
} = require("../controllers/movieReviewController");
const router = express.Router();

router.post("/add", addMovieReview);
router.get("/get", getMovieReviews);
router.delete("/delete/:id", deleteMovieReview);

module.exports = router;
