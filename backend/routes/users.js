const express = require('express');
const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');

// const jwt = require('jsonwebtoken');
// const { json } = require('body-parser');
// require("dotenv").config();


const router = express.Router();


//logIn
router.post('/login', async (req, res) => {

   //Authenticate User

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
})

//Register
router.post('/register', async (req, res,) => {
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
                message: "Email already Registered",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.json({
            message:"success",
        });
        
    }catch (error) {
        res.send("error" + error)
   }
});

//Delete
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const user1 = user.remove()
        res.send("userdata remove  with email id of:" + user.email)
    } catch (err) {
        res.send("error" + err);
    }
})


//Home
router.get('/home', (req, res) => {
    res.send('This is Home');
})


module.exports = router;
