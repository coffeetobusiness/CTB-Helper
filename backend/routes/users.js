const express = require('express');
const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');

const router = express.Router();
//------------JSON WEB TOKEN---------------------

const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("you don't have token");
    }else{
        jwt.verify(token,"jwtSecret",(err,decoded) => {
            if(err){
                res.json({ auth: false, message:"failed to authenticate"});
            }else{
                req.userId = decoded.id;
                res.json({ auth: true, message:"you are authenticated"});
                next();
            }
        })
    }
}

router.get('/isUserAuth', verifyJWT , (req,res) => {
    res.send("you are authenticated")
})

//logIn
router.post('/login', async(req, res) => {
    const user = ({
        email: req.body.email,
        password: req.body.password
    })                      
    try{     //find user with email id
        const user1 = await User.findOne({ email: user.email });
        if (!user1 ){
            res.status(404)
            res.json({
                auth:false,
                message: "User not found incorrect Email",
            });
            return;
        }
                  //password match
        bcrypt.compare(user.password,user1.password,(err,isMatch)=>{
            if(isMatch) {
                 res.status(200)
                //  res.json({
                //  message: "LogIn Success"
                //  })
                  //jwt 
                const id = user1._id;
                const token = jwt.sign({id},"jwtSecret",{
                    expiresIn: "10h",
                })
                res.json({auth:true, token:token, 
                   // result:user1
                }); //jwt end

                return;
                }
            else{
                  res.status(500)
                  res.json({
                      auth:false,
                      message: "Incorrect password"
                    })
                }
            })
        
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
router.get('/home',verifyJWT, async (req, res) => {
  try{
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [email] = token.split(":");
    const user = await User.findOne({ email }).exec();
    if (!res) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
    res.send(user)
  }
  catch (err) {
    res.send("error" + err);
  }
  });


module.exports = router;
