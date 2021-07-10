

const express=require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user1');
const bodyParser = require('body-parser');


const app = express();
var cors = require('cors');   //FOR diffrent port run on same web like connect to React app

app.use(cors());



// Setting up routes
app.use('/users',userRoutes)




//Listening on PORT
PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})
