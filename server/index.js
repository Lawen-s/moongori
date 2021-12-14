const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 4000;
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.set("etag", false);
app.use("/", controllers);
app.get("/", (req, res) => {
  res.status(200).send("Hello sever World!");
});

module.exports = app.listen(PORT, () => {
  console.log(`this server listening on: ${PORT}/`);
});
