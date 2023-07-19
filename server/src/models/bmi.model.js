const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  weight: Number,
  height: Number,
  bmi: Number,
  category: String,
});

module.exports = mongoose.model("BMI", bmiSchema);
