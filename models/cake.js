const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cakeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    yumFactor: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cake", cakeSchema);
