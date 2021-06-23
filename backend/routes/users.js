const express = require('express');
const User = require('../Models/UserModel');

const router = express.Router();

//Login
router.post('/login',async(req,res)=>{
    const user ={
    email : req.body.email,
     password : req.body.password
    }
 if (user){
     res.json(user)
 }
 else{
     res.send("User not found");
 }
});

//Register
router.post('/register',(req,res)=>{
   const users = new User({
       firstName : req.body.firstName,
       lastName : req.body.lastName,
       email : req.body.email,
       password: req.body.password
   })

   try{
       console.log("in try of register/post")
       const user1 = users.save()
       res.json(user1)
   }catch(err){
       res.send("error")
   }
})

//Delete
router.delete('/:id', (req,res)=>{
   try{
       const user =  User.findById(req.params.id)
       const user1 =  user.remove()
       res.json(user1)
   }catch(err){
       res.send("error" + err);
   }
})


//Home
router.get('/Home',(req,res)=>{
   res.send('This is Home');
})


module.exports = router;
