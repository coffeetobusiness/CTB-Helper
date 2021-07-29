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
 
 firstName:String,
 lastName:String,
 email:String,

 userId:{
    type:String,
    required:true
 },

 location:String,

 latitude:String,

 longitude:String,

 address:String,

 city:String,

 state:String,

 country:String,

 category:String,

 phone:String,

 date:String,

 time:String,

 created_at: {
   type: Date,
   default: Date.now
},

 updated_at:String,

 image:String,

 status:String,

 verify:{
   type:Boolean,
   default:false
},

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