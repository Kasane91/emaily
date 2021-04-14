const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const mongoose = require("mongoose");

const User = mongoose.model("User");
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
//passport initializes the mongoose model here,
//and returns a document instance, that also has access to the models method like .save(). This is then attached to each request

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENT_ID,
      clientSecret: process.env.GOOGLECLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, Profile, done) => {
      const exisitingUser = await User.findOne({ googleId: Profile.id });

      if (exisitingUser) {
        return done(null, exisitingUser);
      }
      const newUser = await new User({
        googleId: Profile.id,
      }).save();
      done(null, newUser);
    }
  )
);
