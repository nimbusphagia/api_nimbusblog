import 'dotenv/config'
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import models from '../src/models/index.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}
async function verify(jwt_payload, done) {
  try {
    const user = await models.user.findById(jwt_payload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}
passport.use(new Strategy(opts, verify));

export default passport;
