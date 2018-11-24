const express = require("express");
const passport = require("passport");
const axios = require("axios");
const keys = require("./config");
const func = require("./functions").getTop;
const spotifyStrategy = require("passport-spotify").Strategy;

let app = express();
app.use(express.static("static"));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(
  new spotifyStrategy(
    {
      clientID: keys.id,
      clientSecret: keys.secret,
      callbackURL: "https://9958d027.ngrok.io/auth/spotify/callback"
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      process.nextTick(() => {
        return done(null, { profile, accessToken });
      });
    }
  )
);
app.set("port", 9999);

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", { scope: ["user-top-read"] }),
  (req, res) => {}
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req, res) => {
    retval = func(req.user.accessToken);
    res.redirect("/");
  }
);

app.listen(app.get("port"));
