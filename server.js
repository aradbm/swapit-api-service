const express = require("express");
const db = require("./config/db"); // Import the db.js file
const bodyParser = require("body-parser");
const apiRoutes = require("./apiRoutes"); // Update the file path accordingly
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
