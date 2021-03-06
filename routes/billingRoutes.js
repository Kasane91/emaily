const passport = require("passport");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const requireLogin = require("../middleswares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 worth of email credits",
      source: req.body.id,
    });

    req.user.credits += 5;

    const user = await req.user.save();
    res.send(user);
  });
};
