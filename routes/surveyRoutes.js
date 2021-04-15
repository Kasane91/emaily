const passport = require("passport");
const mongoose = require("mongoose");
const requireLogin = require("../middleswares/requireLogin");
const creditCheck = require("../middleswares/creditCheck");
const Survey = mongoose.model("Survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send(
      "Thanks for your feedback! Add some markup here to make the user feel appreciated"
    );
  });

  app.post("/api/surveys", requireLogin, creditCheck, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const emailList = recipients
      .split(",")
      .map((email) => ({ email: email.trim() }));

    const survey = new Survey({
      title: title,
      body: body,
      subject: subject,
      recipients: emailList,
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //SEND EMAIL ?
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
