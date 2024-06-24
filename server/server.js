const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movieReviewRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
