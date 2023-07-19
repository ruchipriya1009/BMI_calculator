const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  tokenExpiration: {
    type: Date,
    default: null,
  },
  bmi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BMI",
  },
});

module.exports = mongoose.model("User", userSchema);
