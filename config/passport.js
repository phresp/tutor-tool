const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const SamlStrategy = require("passport-saml").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );

  //Strategy Preparation TUM Shibboleth
  // passport.use(
  //   new SamlStrategy(
  //     {
  //       path: "/login/callback",
  //       entryPoint:
  //         "https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php",
  //       issuer: "passport-saml",
  //     },
  //     function (profile, done) {
  //       findByEmail(profile.email, function (err, user) {
  //         if (err) {
  //           return done(err);
  //         }
  //         return done(null, user);
  //       });
  //     }
  //   )
  // );
};
