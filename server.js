const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://user:password1@ds031965.mlab.com:31965/heroku_c10401j7", 
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// routes
app.use(require("./routes/api.js"));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "./public/index.html"));
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});