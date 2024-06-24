const express = require("express");
const {
  addMovieReview,
  getMovieReviews,
  deleteMovieReview,
  updateMovieReview,
} = require("../controllers/movieReviewController");
const router = express.Router();

router.post("/add", addMovieReview);
router.get("/get", getMovieReviews);
router.delete("/delete/:id", deleteMovieReview);
router.put("/edit/:id", updateMovieReview);

module.exports = router;
