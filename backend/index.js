const express=require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser')
const User = require('./Models/UserModel');
const bcrypt = require('bcryptjs')


const app = express();
var cors = require('cors');   //FOR diffrent port run on same web like connect to React app
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


//Setting up routes
app.use('/users',userRoutes)

app.post('/newmovie',function(req,res){
    const firstName = req.body.firstName
    
    const newMovie = new User({
        firstName
        
    })
    console.log(newMovie)
    res.send("done")
    newMovie.save()

})

//Register
app.post('/register', async (req, res) => {
    console.log("i was here in register")
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user1 = await User.findOne({ email: user.email });
        if (user1) {
            res.status(500)
            res.json({
                message: "Email already Registered wow",
            });
            return;
        }else{
            const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        const newUser = await user.save()
        res.status(201).json({ result })
        }

        
        
    }catch (error) {
        res.send("error" + error)
   }
});

//logIn
app.post('/login', async(req, res) => {
    console.log("i was here in login")

    const user = ({
        email: req.body.email,
        password: req.body.password
    })                      
    try{     //find user with email id
        const user1 = await User.findOne({ email: user.email });
        if (!user1 ){
            res.status(504)
            res.json({
                message: "User not found incorrect Email",
            });
            return;
        }
                  //password match
        bcrypt.compare(user.password,user1.password,(err,isMatch)=>{
            if(isMatch) {
                 res.status(200)
                 res.status(200).json({ result: user1 });
                return;
                }
            else{
                  res.status(500)
                  res.json({message: "Incorrect password"})
                }
            })
        
    }
    catch (err) {
        res.send("error" + err)
    }
})


//Listening on PORT
PORT = process.env.PORT || 9000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})
