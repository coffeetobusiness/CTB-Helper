var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema(

{
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true
 },

 userId:{
    type:String,
    required:true
 },

 city:String,

 state:String,

 address:String,

 category:String,

 phone:String,

 date:String,

 location:String,

 time:String,

 created_at:String,

 updated_at:String,

 image:String,

 status:String,

 verified_at:String,

 verified_by:String,

 created_by:String,
 
 comments:String,

 upvotes:String,

 resetToken:String,

 expireToken:String,
}
)

module.exports = mongoose.model('help',UserSchema)