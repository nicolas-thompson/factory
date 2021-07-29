const express = require("express");
const mongoose = require("mongoose");

const bakeryRoutes = require("./routes/bakery");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/bakery", bakeryRoutes);

mongoose
  .connect(
    "mongodb+srv://cakes:odoj8pog@cluster0.lyjgw.mongodb.net/cakes?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
