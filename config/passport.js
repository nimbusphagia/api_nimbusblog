import 'dotenv/config'
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
function verify(jwt_payload, done) {
  User.findOne({ id: jwt_payload.sub }, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}
passport.use(new Strategy(opts, verify));
