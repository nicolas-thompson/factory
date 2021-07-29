const express = require("express");
const { body } = require("express-validator/check");

const bakeryController = require("../controllers/bakery");

const router = express.Router();

router.get("/cakes", bakeryController.getCakes);

router.post(
  "/cake",
  [
    body("id").isInt(),
    body("name").notEmpty().trim().isLength({ max: 5 }),
    body("comment").notEmpty().trim().isLength({ max: 200 }),
    body("imageUrl").notEmpty(),
    body("yumFactor").isInt({ min: 0, max: 5 }),
  ],
  bakeryController.createCake
);

router.get("/cake/:cakeId", bakeryController.getCake);

module.exports = router;
