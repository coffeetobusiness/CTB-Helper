var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema(

{
   
 firstName:{
    type:String,
    required:true
 },
 lastName:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 password:{
     type:String,
     require:true
 },
 verify:{
   type:Boolean,
   default:false
},

 UserRole:{
   type:String,
   default:"Seeker"
 },

 Verify_Role:{
    type:Boolean,
    default:false
 },
 
 resetToken:String,

 expireToken:String,

 phone:String,

 image:String,

 userImage:String,

 address:String,

 city:String,

 state:String,

 country:String,

 description:String,

 time:String,

 date:String,
 
}
)

module.exports = mongoose.model('user',UserSchema)