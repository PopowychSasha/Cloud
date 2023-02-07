import * as dotenv from 'dotenv'
import passport from 'passport'
import PassportJwt from 'passport-jwt'

const JwtStrategy = PassportJwt.Strategy
const ExtractJwt = PassportJwt.ExtractJwt
dotenv.config()

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

opts.secretOrKey = process.env.TOKEN_KEY

const strategy = new JwtStrategy(opts, function (jwtPayload, done) {
  return done(null, jwtPayload, null)
})

passport.use(strategy)

export { passport }
