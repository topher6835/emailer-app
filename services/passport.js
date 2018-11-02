const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {  // user === mongoose model
  done(null, user.id);
});

passport.deserializeUser((id, done) => {  // id to be turned back into mongoose model instance
  User.findById(id)
    .then(user => {   // user fetched from DB
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    return done(null, existingUser);
  }
  const user = await new User({ googleId: profile.id }).save();
    done(null, user);
}

    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id })
    //     .then((existingUser) => {
    //       if(existingUser) {
    //         // We have record with profile ID
    //         done(null, existingUser);   // null indicates no error
    //       } else {
    //         // No user record with ID, make new...
    //         new User({ googleId: profile.id })
    //           .save()
    //           .then(user => done(null, user));
    //       }
    //     });
    // }
  )
);
