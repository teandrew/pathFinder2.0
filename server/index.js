const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use("/word", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
