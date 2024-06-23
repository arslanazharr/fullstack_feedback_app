const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movieReviewRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);

app.listen(3001, () => {
  console.log("running on port 3001");
});
