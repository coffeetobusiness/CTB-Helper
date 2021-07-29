const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();

//----model
const User = require('../Models/UserModel');
const Help = require('../Models/HelpModel');
//------------JSON WEB TOKEN---------------------

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
   }
}))
//middleware
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        res.status(403)
        res.json({ auth: false, message:"you dont have token"});
    }else{
        jwt.verify(token,"jwtSecret",(err,decoded) => {
            if(err){
                res.status(403)
                res.json({ auth: false, message:"failed to authenticate"});
            }else{
                req.userId = decoded.id;
               // res.json({ userId:decoded.id, auth: true, message:"you are authenticated"});
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
                  //jwt 
                const id = user1._id;
                const token = jwt.sign({id},"jwtSecret",{
                    expiresIn: "7d",
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

//////////Help Post
router.post('/help', verifyJWT , async (req, res,) => {

    const user = await User.findOne({ _id: req.userId });

    if(user){
        const currentDate = new Intl.DateTimeFormat("en-GB",{dateStyle:"long",}).format()
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        
        user.UserRole = "Contributor"
      
        const help = new Help({
            title: req.body.title,
            phone: req.body.phone,
            category: req.body.category,
            description: req.body.description,
            image:req.body.image,

            location: req.body.location,
            latitude:req.body.latitude,
            longitude:req.body.longitude,

            address: req.body.address, 
            city: req.body.city, 
            state: req.body.state, 
            country: req.body.country, 

            time:currentTime,
            date:currentDate,
            
            userId:user._id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName
            
        })
    
        try {
        await help.save()
              user.save()
        res.json({
            message:"success",
        });
        
        }catch (error) {
        res.send("error" + error)
        }
    }
    else{
        res.send("Invalid user")
    }
});

//Help Get
router.get('/help', async (req, res,) => {
    try {
        await  Help.find({}, function (err, users) {
            res.send(users);
        });
    }catch (error) {
        res.json("error" + error)
   }
});

router.get('/userdata',verifyJWT, async (req, res) => {
   
  const user = await User.findOne({ _id: req.userId });

   if(user){
       try{
            res.json(user)
           console.log(user)
       }
       catch (err) {
        res.send("error" + err)
       }
   }else{
       res.send("no user")
   }
});

//for volunteer 
router.post('/volunteer', verifyJWT , async (req, res,) => {

    const user = await User.findOne({ _id: req.userId });

    if(user){
        const currentDate = new Intl.DateTimeFormat("en-GB",{dateStyle:"long",}).format()
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        
        user.UserRole = "Volunteer"

        user.phone = req.body.phone
        user.image = req.body.image
        user.userImage =req.body.userImage

        user.address = req.body.address
        user.city = req.body.city
        user.state = req.body.state
        user.country = req.body.country

        user.description = req.body.description

        user.time = currentTime
        user.date = currentDate
    
      try {
        await user.save()
        res.json({
            message:"success",
        });
        
      }catch (error) {
        res.send("error" + error)
        }
    }
    else{
        res.send("Invalid user")
    }
});

//reset password
router.post('/reset-password',(req,res)=>{
        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                console.log(err)
            }
            const token = buffer.toString("hex")
            User.findOne({email:req.body.email})
            .then(user=>{
                if(!user){
                    res.status(422)
                    res.json({error: "User not found with this email"})
                    return;
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save()
                .then((result)=>{
                    transporter.sendMail({
                        to:user.email,
                        from:"uditmehra80@gmail.com",
                        subject:"PASSWORD RESET",
                        html:`
                        <p>You requested for password reset</p>
                        <h2>Click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</h2>
                        `
                    })
                res.json({
                    message:"check your email and update password with 60 Min",
                })
                })
    
            })
        })
})
////////New Password
router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
             res.status(422)
             res.json({error:"Try again session expired"})
            return;
        }
        bcrypt.hash(newPassword,10).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    })
    .catch(error=>{
        console.log(error)
    })
})

//Verify Email
router.post('/verifyclick',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                res.status(422)
                res.json({error: "User not found with this email"})
                return;
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save()
            .then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"uditmehra80@gmail.com",
                    subject:"EMAIL VERIFY",
                    html:`
                    <p>You requested for verify email</p>
                    <h2>Click in this <a href="http://localhost:3000/verify/${token}">link</a> to reset your password</h2>
                    `
                })
            res.json({
                message:"check your email",
            })
            })

        })
    })
})
//Verify Email
router.post('/verify-email',(req,res)=>{
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
             res.status(422)
             res.json({error:"Try again session expired"})
            return;
        }else{
            user.resetToken = undefined
            user.expireToken = undefined
            user.verify = true
            user.save()
            res.json({message:"verified"})
        }
    })
    .catch(error=>{
        console.log(error)
    })
})




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