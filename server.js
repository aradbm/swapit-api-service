const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
// Routes:
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const backPackRoutes = require("./routes/backpackRoutes");
const wishListRoutes = require("./routes/wishlistRoutes");
// const locationRoutes = require("./routes/locationRoutes");

app.use(bodyParser.json()); // This allows Express to understand JSON payloads in request bodies.
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", backPackRoutes);
app.use("/api", wishListRoutes);
// app.use("/api", locationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
