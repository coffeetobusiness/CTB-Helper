const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./Models/UserModel')
const express = require('express')

function initialize(passport){
    const authenticateUser = async(email,password,done)=>{
        console.log("in authenticate");
        const user = ({
            email: req.body.email,
            password: req.body.password
        })
        
    
        
        try{     //find user with email id
            const user1 = await User.findOne({ email: user.email });
            if (!user1 ){
                res.status(404)
                res.json({
                    message: "User not found incorrect Email",
                });
                return;
            }
                      //password match
            bcrypt.compare(user.password,user1.password,(err,isMatch)=>{
                if(isMatch) {
                     res.status(200)
                     res.json({
                        message: "LogIn Success"
                      })
                    return;
                    }
                else{
                      res.status(500)
                      res.json({
                          message: "Incorrect password"
                        })
                    }
                })
                // const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
                // res,json({accessToken:accessToken})
                // console.log("accesToken is",accessToken);
               
        }
        catch (err) {
            res.send("error" + err)
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