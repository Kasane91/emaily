const passport = require("passport");
const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");
const mongoose = require("mongoose");
const requireLogin = require("../middleswares/requireLogin");
const creditCheck = require("../middleswares/creditCheck");
const Survey = mongoose.model("Survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    console.log(req.user);
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    console.log(surveys);
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send(
      "Thanks for your feedback! Add some markup here to make the user feel appreciated"
    );
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: `answer_${match.choice}`,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: { $elemMatch: { email: email, hasResponded: false } },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.hasResponded": true },
            $set: { lastResponded: new Date() },
          }
        ).exec();
      })

      .value();

    res.send("YOLO");
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
