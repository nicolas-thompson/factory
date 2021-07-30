const fs = require("fs");
const path = require("path");

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
        cake: result,
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

exports.updateCake = (req, res, next) => {
  const cakeId = req.params.cakeId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const comment = req.body.comment;
  let imageUrl = req.body.image;
  const yumFactor = req.body.yumFactor;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  Cake.findById(cakeId)
    .then((cake) => {
      if (!cake) {
        const error = new Error("Could not find cake.");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== cake.imageUrl) {
        clearImage(cake.imageUrl);
      }
      cake.name = name;
      cake.comment = comment;
      cake.yumFactor = yumFactor;
      return cake.save();
    })
    .then((result) =>
      res
        .status(200)
        .json({ message: "Cake updated succesfully.", cake: result })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
