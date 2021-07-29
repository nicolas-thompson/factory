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
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect",
      errors: errors.array(),
    });
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
      console.log(err);
    });
};
