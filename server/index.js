const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const router = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.once("open", () => console.log("connected to mongodb")).on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// FOR TESTING
app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
