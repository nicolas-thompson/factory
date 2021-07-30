const { validationResult } = require("express-validator/check");

const Cake = require("../models/cake");

exports.getCakes = (req, res, next) => {
  Cake.find()
    .then((cakes) => {
      res.status(200).json({ message: "Found some cakes.", cakes: cakes });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createCake = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const comment = req.body.comment;
  const imageUrl = req.file.path;
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

exports.getCake = (req, res, next) => {
  const cakeId = req.params.cakeId;
  Cake.findById(cakeId)
    .then((cake) => {
      if (!cake) {
        const error = new Error("Could not find cake.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Cake found.", cake: cake });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
