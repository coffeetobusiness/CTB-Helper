const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport){
    const authenticateUser = async(email,password,done)=>{
        console.log("in authenticate");
        const user = {user : email};
        if(user == null){
            return done(error,false,{message:'No user with that email'})
        }
        try{
            return done(null,user);
            if(await bcrypt.compare(password,user.password)) {
              
            }else{
                return done(null,false,{message:'Password incorrect'})
            }
        }catch (e){
          return done(e)
        }
    }



passport.use(new LocalStrategy({
    usernameField: 'email'
  },authenticateUser
))
passport.serializeUser((user,done)=>{})
passport.deserializeUser((id,done)=>{})
}
module.exports = initialize



// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('./Models/UserModel');

// const validPassword = require('./lib/passwordUtils').validPassword;

// const customFields = {
//     usernameField: 'email'
    
// };

// const verifyCallback = (username, password, done) => {

//     User.findOne({ username: username })
//         .then((user) => {

//             if (!user) { return done(null, false) }
            
//             const isValid = validPassword(password, user.hash, user.salt);
            
//             if (isValid) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             }
//         })
//         .catch((err) => {   
//             done(err);
//         });

// }

// const strategy  = new LocalStrategy(customFields, verifyCallback);

// passport.use(strategy);

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((userId, done) => {
//     User.findById(userId)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch(err => done(err))
// });