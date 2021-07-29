const express = require("express");
const { body } = require("express-validator/check");

const bakeryController = require("../controllers/bakery");

const router = express.Router();

// GET /bakery/cakes
router.get("/cakes", bakeryController.getCakes);

// POST /bakery/cake
router.post(
  "/cake",
  [
      body("id").isInt(),
      body("name").notEmpty().trim().isLength({ max: 30 }),
      body("comment").notEmpty().trim().isLength({ max: 200 }),
      body("imageUrl").notEmpty(),
      body("yumFactor").isInt({ min: 0, max: 5}),
    ],
  bakeryController.createCake
);

module.exports = router;