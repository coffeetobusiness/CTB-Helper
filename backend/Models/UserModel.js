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

 resetToken:String,

 expireToken:String,
}
)

module.exports = mongoose.model('user',UserSchema)