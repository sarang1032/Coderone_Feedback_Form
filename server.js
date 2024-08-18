const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const feed = require("./models/Feedback");
const app = express();
const port = 3000;
mongoose
  .connect(
    //Insert link of your mongodb atlas cluster connection
    ""
  )
  .then(() => console.log("Database Connected Successfully"))
  .catch((error) => console.log("Error connecting database: ", error));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.post("/submit-feedback", async (req, res) => {
  const { name, number, email, feedback: feedbackTEXT } = req.body;
  const feedback = new feed({
    name,
    number,
    email,
    feedback: feedbackTEXT,
  });
  try {
    await feedback.save();
    console.log("Feedback saved successfully");
    res.send(`<html>
            <head>
            <title>Feedback submitted</title>
            <body>
            <h1>Thank YOU</h1>
            <p>Your feedback is submitted successfully</p>
            <a href="/">Go back to Feedback Form</a></body></head></html>`);
  } catch (error) {
    console.log("Error occured while submitting feedback: ", error);
    res.status(500).send("There was an error while submitting your feedback");
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
