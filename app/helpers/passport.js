import passport from "passport";
import { Strategy as  BearerStrategy} from "passport-http-bearer";
import { validarToken } from "../middlewares/JWT.js";

passport.use(new BearerStrategy( 
  { passReqToCallback: true },
  async function(req, token, done) {
    const usuario =  await validarToken(req, token)
    if (!usuario) return done(null, false);
    return done(null, usuario);
  }
));
export default passport; 