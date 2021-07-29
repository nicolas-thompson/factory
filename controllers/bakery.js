const { validationResult } = require("express-validator/check");

const Cake = require("../models/cake");

exports.getCakes = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        id: "1",
        name: "First Cake",
        comment: "This is the first cake",
        imageUrl: "images/cake.jpg",
        yumFactor: "5",
      },
    ],
  });
};

exports.createCake = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const comment = req.body.comment;
  const imageUrl = req.body.imageUrl;
  const yumFactor = req.body.yumFactor;
  const cake = new Cake({
    name: name,
    comment: comment,
    imageUrl: imageUrl,
    yumFactor: yumFactor,
  });
  cake
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Cake created successfully",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
