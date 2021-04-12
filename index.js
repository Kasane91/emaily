require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./services/passport");
const authRoutes = require("./routes/authRoutes");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Sever running on port 5000");
});
