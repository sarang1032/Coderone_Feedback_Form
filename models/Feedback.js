const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  feedback: String,
});
module.exports = mongoose.model("feedback", feedbackSchema);
