require("./models/User");
require("./models/Track");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

app.use(bodyParser.json());
app.use(authRoutes);

app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://asadkhan:passwordpassword@cluster0.bw3tm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri, async (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, () => {
  console.log("Example app listening on port 3000!");
});
