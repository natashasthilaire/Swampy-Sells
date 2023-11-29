const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    //let user;
    try {
        const user = await User.findOne({ email });
        if (user == null) {
            return done(null, false);
        }
        const same = await bcrypt.compare(password, user.password);
        if (!same) {
            const hashedP = await bcrypt.hash(password, 12);
            console.log(hashedP, user.password);
            return done(null, false);
        }
        else {
            console.log('found user in authticateUser function in passportStrategy');
            return done(null, user);
        }
    } catch (error) {
        console.error('There was an error with passport');
        return done(error);
    }
}
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    // return done(null, getUserById(id))
    try {
        const user = await User.findById(id);
        done(null, user);
    }catch(err) {
        done(err)
    }
    
    });
  
};

module.exports = initialize