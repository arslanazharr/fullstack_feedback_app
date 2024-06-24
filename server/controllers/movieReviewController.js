const db = require("../config/db");

const addMovieReview = (req, res) => {
  const { movieName, movieReview, movieRating } = req.body;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview, movieRating) VALUES (?,?,?)";
  db.query(sqlInsert, [movieName, movieReview, movieRating], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to add movie review" });
    } else {
      res.status(200).json({
        id: result.insertId,
        movieName: movieName,
        movieReview: movieReview,
        movieRating: movieRating,
      });
    }
  });
};

const getMovieReviews = (req, res) => {
  const sqlInsert = "SELECT * FROM movie_reviews;";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.status(500).json("Failed to get movie reviews");
    } else {
      res.status(200).json(result);
    }
  });
};

const deleteMovieReview = (req, res) => {
  const reviewId = req.params.id;
  const sqlInsert = "DELETE FROM movie_reviews WHERE id = ?";
  db.query(sqlInsert, reviewId, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to delete movie review" });
    } else {
      res.status(200).json({ message: "Movie review deleted successfully" });
    }
  });
};

const updateMovieReview = (req, res) => {
  const { movieName, movieReview, movieRating } = req.body;
  const reviewId = req.params.id;
  const sqlInsert =
    "UPDATE movie_reviews SET movieName = ?, movieReview = ?, movieRating = ? WHERE id = ?";
  db.query(
    sqlInsert,
    [movieName, movieReview, movieRating, reviewId],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "Failed to update movie review" });
      } else {
        res.status(200).json({ message: "Movie review update successfully" });
      }
    }
  );
};

module.exports = {
  addMovieReview,
  getMovieReviews,
  deleteMovieReview,
  updateMovieReview,
};
