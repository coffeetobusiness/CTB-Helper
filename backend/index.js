if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express=require('express');
const mongoose = require('mongoose');
// const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('flash');

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => userRoutes.find(user.email === email)
)


const app = express();
var cors = require('cors');   //FOR diffrent port run on same web like connect to React app
// const { session } = require('passport');
const session = require('express-session')
app.use(cors());


//Database Connection
const url = "mongodb://localhost/my_db";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false})
const db = mongoose.connection
db.on('open',()=>console.log('db connected'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialize: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Setting up routes
// app.use('/users',userRoutes)




app.post('/login',  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 

}))




//Listening on PORT
PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})
