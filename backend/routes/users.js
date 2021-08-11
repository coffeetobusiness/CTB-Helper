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
// const sendgridTransport = require('nodemailer-sendgrid-transport')

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:"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"
//    }
// }))

//key id-  AKIA2CCP7WEIRZFSK6WG
//secret key-  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

//ARn aws -  arn:aws:iam::691657486609:user/udituser
//myuserbacket
// arn:aws:s3:::myuserbacket
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

//PROFILE IMAGE STORING STARTS

const s3 = new aws.S3({
accessKeyId: 'AKIA2CCP7WEIRZFSK6WG',
secretAccessKey: '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',
Bucket: 'myuserbacket'
});

//Single Upload

const ImgUpload = multer({
 storage: multerS3({
 s3: s3,
 bucket: 'myuserbacket',
 acl: 'public-read',
 key: function (req, file, cb) {
  cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
 }
}),
limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
fileFilter: function( req, file, cb ){
 checkFileType( file, cb );
}
}).single('Image');

function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
   }

router.post( '/img-upload', ( req, res ) => {
    ImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.status(403)
     res.json( { message: "only image accepted less than 2 Mb" } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( {message: "Image not found" } )
     } else {
      // If Success
      console.log(req.file.location)
      const imageName = req.file.key;
      const imageLocation = req.file.location;// Save the file name into database into profile model
      res.json({
       image: imageName,
       location: imageLocation
      })
     }
    }
   })
});



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'uditmehra70@gmail.com', //your google email
    pass: 'yourpassward'      //your password
  }
});


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
        
        if(user.UserRole=="Admin"){
            user.UserRole = "Admin"
        }else{
            user.UserRole = "Contributor"
        }

        ImgUpload( req, res, ( error ) => {
              console.log( 'requestOkokok', req.file );
            //  console.log( 'error', error );
            console.log( 'data', req.body );
            if( error ){
             console.log( 'errors', error );
             res.status(403)
             res.json( { message: "only image accepted less than 2 Mb" } );
            } else {
             // If File not found
             if( req.file === undefined ){
                res.status(404)
              console.log( 'Error: No File Selected!' );
              res.json( {message: "Image not found" } )
             } else {

                console.log(req.file.location)
                const imageName = req.file.key;
                 const imageLocation = req.file.location;

                    const help = new Help({
                    title: req.body.title,
                    phone: req.body.phone,
                    category: req.body.category,
                    description: req.body.description,
                    image:imageLocation,
        
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
                 help.save()
                 user.save()
                res.status(200)
                res.json({
                    message:"success",
                    image: imageName,
                    location: imageLocation
                });
                
                }catch (error) {
                    res.send("error" + error)
               }
             }
            }
           })
    }
    else{
        res.send("Invalid user")
    }
});

//All Help Get
router.get('/help',verifyJWT, async (req, res,) => {
    try {
        await  Help.find({}, function (err, users) {
            res.send(users);
        });
    }catch (error) {
        res.json("error" + error)
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
    const help = await Help.findOne({ _id: req.body.PostForVerify });
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

    const user = await User.findOne({ _id: req.userId });

    if(user){
        const currentDate = new Intl.DateTimeFormat("en-GB",{dateStyle:"long",}).format()
        const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        
        if(user.UserRole=="Admin"){
            user.UserRole = "Admin"
        }else{
            user.UserRole = "Volunteer"
        }

        ImgUpload( req, res, ( error ) => {
              console.log( 'requestOkokok', req.file );
            //  console.log( 'error', error );
            console.log( 'data', req.body );
            if( error ){
             console.log( 'errors', error );
             res.status(403)
             res.json( { message: "only image accepted less than 2 Mb" } );
            } else {
             // If File not found
             if( req.file === undefined ){
                res.status(404)
              console.log( 'Error: No File Selected!' );
              res.json( {message: "Image not found" } )
             } else {

                console.log(req.file.location)
                const imageName = req.file.key;
                 const imageLocation = req.file.location;

                 
        user.image = imageLocation

        user.phone = req.body.phone
        user.address = req.body.address
        user.city = req.body.city
        user.state = req.body.state
        user.country = req.body.country

        user.description = req.body.description

        user.time = currentTime
        user.date = currentDate
    
        try {
         user.save()
        res.json({
            message:"success",
        });
        
        }catch (error) {
        res.send("error" + error)
        }


        }
    }
    })
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
                    from:"uditmehra70@gmail.com",
                    subject:"EMAIL VERIFY",
                    html:`
                    <p>You requested for verify email</p>
                    <h2>Click in this <a href="http://localhost:3000/verify/${token}">link</a> to Verify your email</h2>
                    `
                },function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent to: '+user.email + info.response);
                    }
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

//profilephoto
router.post('/profilephoto', verifyJWT ,( req, res ) => {
    ImgUpload( req, res, ( error ) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if( error ){
     console.log( 'errors', error );
     res.status(403)
     res.json( { message: "only image accepted less than 2 Mb" } );
    } else {
     // If File not found
     if( req.file === undefined ){
      console.log( 'Error: No File Selected!' );
      res.json( {message: "Image not found" } )
     } else {
      // If Success

      console.log(req.file.location)
      const imageName = req.file.key;
      const imageLocation = req.file.location;
      
       res.json({
       image: imageName,
       location: imageLocation
      })
        User.findByIdAndUpdate(req.userId , { userImage: imageLocation },
            function (err, docs) {
           if (err){
            console.log(err)
           }
          else{
          console.log("Updated User : ", docs);
             }
});
     }
    }
   })
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



//Delete
router.delete('/removeuser',verifyJWT, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        user.remove()

        res.json({
            message: "userdata remove  with email id of:" + user.email
          });
    } catch (err) {
        res.send("error" + err);
    }
})
 // editprofile
 router.post('/EditProfile', verifyJWT , async (req, res,) => {

    const user = await User.findOne({ _id: req.userId });

    if(user){
       
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.email = req.body.email
        user.phone = req.body.phone

        user.address = req.body.address
        user.city = req.body.city
        user.state = req.body.state
        user.country = req.body.country
       
    
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