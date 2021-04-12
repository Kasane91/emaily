const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENT_ID,
      clientSecret: process.env.GOOGLECLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, Profile, done) => {
      console.log("accessToken:" + accessToken);
      console.log("RefreshToken: ", refreshToken);
      console.log("Profile:", Profile);
    }
  )
);
