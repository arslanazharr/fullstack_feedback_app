const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CRUDDataBase",
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

app.post("/api/add", (req, res) => {
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
});

app.get("/api/get", (req, res) => {
  const sqlInsert = "SELECT * FROM movie_reviews;";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.status(500).json("Failed to get movie reviews");
    } else if (result.length === 0) {
      res.status(200).json({ message: "No reviews found" });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const reviewId = req.params.id;
  console.log("reviewID", reviewId);
  const sqlInsert = "DELETE FROM movie_reviews WHERE id = ?";
  db.query(sqlInsert, reviewId, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to delete movie review" });
    } else {
      res.status(200).json({ message: "Movie review deleted successfully" });
    }
  });
});
