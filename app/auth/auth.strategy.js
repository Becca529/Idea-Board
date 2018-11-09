const passport = require('passport');

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../user/user.model');
const { JWT_SECRET } = require('../config');


//Validates User + Password combination when accessing endpoint
const localStrategy = new LocalStrategy((username, password, passportVerify) => {
    let user;
    //Validate username exists in database
    User.findOne({ username: username }).then(_user => {
        user = _user;
        if (!user) {
            //If username not found - reject promise and return with login error
            return Promise.reject({
                reason: 'LoginError',
                message: 'Incorrect username or password'
            });
        }
        //If username found - validate user's password against stored password hash
        return user.validatePassword(password);
    }).then(isValid => {
        if (!isValid) {
            // If password does not match stored hash password - reject promise and return with login error
            return Promise.reject({
                reason: 'LoginError',
                message: 'Incorrect username or password'
            });
        }
        //If authentication is sucessfull return the passportVerify callback passing in user
        return passportVerify(null, user);
    }).catch(err => {
        //Catch all error handling - if any other log in error occurs return passportVerify callback passing in error msg
        if (err.reason === 'LoginError') {
            return passportVerify(null, false, err.message);
        }
        return passportVerify(err, false);
    });
});

//Validates json web token when accessing endpoint
const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        algorithms: ['HS256']
    },
    (token, done) => {
        done(null, token.user);
    }
);

const localPassportMiddleware = passport.authenticate('local', { session: false });
const jwtPassportMiddleware = passport.authenticate('jwt', { session: false });

module.exports = { localStrategy, jwtStrategy, localPassportMiddleware, jwtPassportMiddleware };