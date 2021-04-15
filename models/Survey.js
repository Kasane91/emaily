const mongoose = require("mongoose");
const recipientSchema = require("./recipient");

const { Schema, model } = mongoose;

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  answer_yes: { type: Number, default: 0 },
  answer_no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
});

model("Survey", surveySchema);

const survey = {
  title: "my title",
  subject: "my subject",
  recipients: "sondre.sorasdekkan@gmail.com, sondremac@hotmail.com",
  body: "Here's my body",
};
