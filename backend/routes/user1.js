
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const findOrCreate = require("mongoose-findorcreate");
const gauth = require('../Models/gschema');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require("../Models/keys");
const FacebookStrategy = require('passport-facebook').Strategy;
const fbauth = require('../Models/fbschema');


// routes.use(bodyParser.urlencoded({extended:true}));

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({
    extended:true
}));

routes.use(cookieParser('secret'));
routes.use(session({
    secret:'process.env.SESSION_SECRET',
    maxAge:'3600000',
    resave:'true',
    saveUninitialized:'true'
}))

routes.use(passport.initialize());
routes.use(passport.session())

routes.use(flash());


//Global variables
routes.use(function(req,res,next){
res.locals.success_message = req.flash('success_message');
res.locals.error_message = req.flash('error_message');
res.locals.error = req.flash('error');
next();
})

const checkAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.set('Cache-Control','no-cache,private,no-store,must-revalidate,post-check=0,pre-check=0');
        return next();
    }else{
        console.log("in else auth")
        res.redirect('/login')
    }
}

//Database Connection
const url = "mongodb://localhost/log_auth1";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false})
.then(()=>console.log('database connected'))



routes.get('/',(req,res)=>{
    res.send("redirect to login")
    // res.redirect('/login')
})



// Register
routes.post('/register', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    console.log("fname",req.body)
    try {
        const user1 = await User.findOne({ email: user.email });

        console.log("user found",user1);
        if (user1) {
            res.status(500)
            res.json({
                message: "Email already Registered",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        console.log("user passwprd befor is",user.password)
        user.password = await bcrypt.hash(user.password, salt);
        console.log("user passwprd aftr is",user.password)
        await user.save()
        res.json({
            message:"success",
        });
        
    }catch (error) {
        console.log("in catch error")
        res.send("error" + error)
   }
});


//Authentication Strategy
 
let localStrategy = require('passport-local').Strategy;
const { Router } = require('express');
const { Cookie } = require('express-session');
passport.use(new localStrategy({usernameField:'email'},(email,password,done)=>{
    // console.log('in local start')
    User.findOne({email:email},(err,data)=>{
        console.log("user is",email)
        if(err) throw err;
        if(!data){
            return done(null,false);
        }
        bcrypt.compare(password,data.password,(err,match)=>{
            if(err) {
                return done(null,false);
            }
            if(!match){
                return done(null,false);
            }
            if(match){
                return done(null,data);
            }
        })
    })
}));


passport.serializeUser(function(user,cb){
    cb(null,user.id)
});

passport.deserializeUser(function(id,cb){
   User.findById(id,function(err,user){
       cb(err,user)
   })
})



///--------END OF AUTHENTICATION STRATEGY--------////////




//Google Authentication


//Authentication Using Google
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:4000/users/auth/google/callback"
  },
  function (accessToken, refreshToken, profile, done) {
      console.log("access token is",accessToken)
       gauth.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });

 
    //   isLoggedIn();

         
        
    
    

    // console.log("req is ",req);
    // console.log("access token is ",accessToken);
    // console.log("profile is ...................",profile)
      
  }
//    profile=>{
//        console.log("profile is", profile.id)
//    }
));



//Authentication with facebook
passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "http://localhost:9000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("access token in fb is",accessToken);
      console.log("profile in fb is",profile)
    fbauth.findOrCreate({ facebookId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));



//routes google
routes.get('/auth/google',
  passport.authenticate('google', { scope : ['profile', 'email'] }));

  
routes.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
      console.log("eq is",req)
    res.redirect('/users/home');
  });

//facebook

routes.get('/auth/facebook', passport.authenticate('facebook'));
routes.get('/auth/facebook/callback',
passport.authenticate('facebook', {failureRedirect: '/login' }),
function(req,res){
    console.log("req in fb",req)
    res.redirect('/users/home');
}
);



///-----//////////

routes.get('/login',(req,res)=>{
    
   
    res.send("in login ")   
    
   
    
    
});
//Login
routes.get('/login',checkAuthenticated,(req,res)=>{
   
       res.send("success")
    
    // res.redirect('/success');
    
});

routes.post('/login',(req,res,next)=>{
passport.authenticate('local',{
    failureRedirect:'/users/login',
    successRedirect:'/users/success',
    failureFlash:true
})(req,res,next);
console.log("logged in successfully");
console.log("session is",Cookie)

});

//Success
routes.get('/success',checkAuthenticated,(req,res,next)=>{
     console.log("in success")
     res.send("success")
  
})

//trial route
routes.get('/home',(req,res,next)=>{
    console.log("in home");
    res.send("home");
})


//Logout
routes.post('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login');
})

//Home
routes.get('/home', checkAuthenticated,(req, res) => {
    res.send('This is Home');
    // console.log("in home")
})

module.exports = routes;