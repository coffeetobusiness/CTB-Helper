const express = require('express');
const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();
//------------JSON WEB TOKEN---------------------

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
   }
}))

const verifyJWT = (req, res, next) => {
    console.log("i was in jwt")

    // const token = req.headers["x-access-token"]
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    // const token = localStorage.getItem('token')

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
    console.log("i was here")
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
                const name= user1.firstName;
                const token = jwt.sign({id},"jwtSecret",{
                    expiresIn: "7d",
                })
                res.json({auth:true, token:token,name:name
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


const Help = require('../Models/HelpModel');
//////////Help Post
router.post('/help', verifyJWT, async (req, res) => {

    console.log("i was here in users backend")
    const user = await User.findOne({ _id: req.userId });
    console.log(req.body)

    const currentDate = new Intl.DateTimeFormat("en-GB",{dateStyle:"long",}).format()
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    // if(user.UserRole=="Admin"){
    //     user.UserRole = "Admin"
    // }else{
    //     user.UserRole = "Contributor"
    // }
    // ImgUpload( req, res, ( error ) => {
    //     // console.log( 'requestOkokok', req.file );
    //     // console.log( 'error', error );
    //     if( error ){
    //      console.log( 'errors', error );
    //      res.status(403)
    //      res.json( { message: "only image accepted less than 2 Mb" } );
    //     } else {
    //      // If File not found
    //      if( req.file === undefined ){
    //       console.log( 'Error: No File Selected!' );
    //       res.json( {message: "Image not found" } )
    //      } else {
    //       // If Success
    //       console.log(req.file.location)
    //       const imageName = req.file.key;
    //       const imageLocation = req.file.location;// Save the file name into database into profile model
    //       res.json({
    //        image: imageName,
    //        location: imageLocation
    //       })
    //       help.image = ""
    //      }
    //     }
    //    })


    const help = new Help({
        title: req.body.title,
        phone: req.body.phone,
        address: req.body.address, 
        city: req.body.city, 
        state: req.body.state, 
        description: req.body.description,
        country: req.body.country, 
        
        // location: req.body.location,
        // latitude:req.body.latitude,
        // longitude:req.body.longitude,

        
        time:currentTime,
        date:currentDate,
        likes:[],
        comment:[],

        userId:user._id,
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName
        
    })
    console.log(help)
     help.save()
        res.json({
            message:"success",
        });
            // res.send(help);
            // console.log(he)
        
});

//Help Get
router.get('/help/post', async (req, res,) => {
    // console.log("i was hre in get methoc")
    try {
        await  Help.find({}, function (err, users) {
            res.send(users);
            // console.log(users)
        });
    }catch (error) {
        res.json("error" + error)
   }
});

//reset
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


//upvote
router.put('/:id/likePost',verifyJWT ,async (req,res)=>{
    
    const user = await User.findOne({ _id: req.userId });// user id
    
    const { id } = req.params//post id
    console.log(id)
    console.log(user.firstName)

    
    const post = await Help.findById(id);

    const index = post.likes.findIndex((id) => id ===String(user._id));
    console.log(index)

    if (index === -1) {
        //new like
      post.likes.push(user._id);
      console.log(typeof(post.likes))
    } else {
        //remove like
      post.likes = post.likes.filter((id) => id !== String(user._id));
        
    }
    const updatedPost = await Help.findByIdAndUpdate(id, post, { new: true });
    console.log(updatedPost)
    res.status(200).json(updatedPost);
})

//comment
router.put('/:id/comment',verifyJWT,async (req,res)=>{
    
    const user = await User.findOne({ _id: req.userId });// user id
    const { id } = req.params
    // const data = req.body.comment
    const data = `${user.firstName}:${req.body.comment}`
    console.log(id)
    console.log(user.firstName)
    console.log(data)


    
    const post = await Help.findById(id);
    post.comment.push(data)
    
    const updatedPost = await Help.findByIdAndUpdate(id, post, { new: true });
    console.log(updatedPost)
    res.status(200).json(updatedPost);
    // res.json({
    //     message:"success",
    // });
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


  //for profile
router.get('/userdata',verifyJWT, async (req, res) => {
   
    const user = await User.findOne({ _id: req.userId });
  
     if(user){
         try{
              res.json(user)
         }
         catch (err) {
          res.send("error" + err)
         }
     }else{
         res.send("no user")
     }
  });
  
  //profilephoto
router.post('/profilephoto', verifyJWT , async (req, res,) => {

    const user = await User.findOne({ _id: req.userId });

    if(user){
       
        user.userImage = req.body.image
    
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

//Make me Admin
router.post('/adminme', verifyJWT , async (req, res,) => {

    const user = await User.findOne({ _id: req.userId });

    if(user){
       
        user.UserRole = req.body.UserRole
        user.Verify_Role = req.body.Verify_Role
    
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



  //All user for verify by admin
  router.get('/allvolunteeruserdata',verifyJWT, async (req, res,) => {
      try {
          await  User.find({UserRole:'Volunteer',Verify_Role:false}, function (err, users) {
              res.send(users);
              console.log(users)
          });
      }catch (error) {
          res.json("error" + error)
     }
  });
  
  //verify post by volunteer
  router.get('/allpost_toverify',verifyJWT,  async (req, res,) => {
      try {
          await  Help.find({verify:false}, function (err, helps) {
              res.send(helps);
              console.log(helps)
          });
      }catch (error) {
          res.json("error" + error)
     }
  });
  
  //Verify volunteer by Admin
  
  router.post('/verifyvolunteer',verifyJWT, async (req, res,) => {
      const user = await User.findOne({ email: req.body.emailForVerify });
      try {
          if (user) {
              res.status(200)
              user.Verify_Role = true
              await user.save()
              res.json({
                  message: "Success",
              });
              return;
          }
          res.status(404)
          res.json({
              message:"Email not Found",
          });  
      }catch (error) {
          res.send("error" + error)
     }
  });
  
  //verifypost by volunteer
  router.post('/verifypostbyvolunteer',verifyJWT, async (req, res,) => {
      const help = await Help.findOne({ email: req.body.PostForVerify });
      try {
          if (help) {
              res.status(200)
              help.verify = true
              await help.save()
              res.json({
                  message: "Success",
              });
              return;
          }
          res.status(404)
          res.json({
              message:"Email not Found",
          });  
      }catch (error) {
          res.send("error" + error)
     }
  });
  
  //for volunteer 
  router.post('/volunteer', verifyJWT , async (req, res,) => {
    console.log("i was in volunteer backend")
    // const user = await User.findOne({ _id: req.userId });
    const user = await User.findOne({ _id: req.userId });
    console.log(user.firstName)

  
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
            console.log("i was in volunteer error")
          res.send("error" + error)
          }
      }
      else{
          res.send("Invalid user")
      }
  });
  


module.exports = router;