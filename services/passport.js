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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENT_ID,
      clientSecret: process.env.GOOGLECLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, Profile, done) => {
      User.findOne({ googleId: Profile.id })
        .then((exisitingUser) => {
          if (exisitingUser) {
            done(null, exisitingUser);
          } else {
            //Create a new user record
            new User({
              googleId: Profile.id,
            })
              .save()
              .then((user) => done(null, user));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  )
);
