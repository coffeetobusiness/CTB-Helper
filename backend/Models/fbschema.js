const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const fbschema = new mongoose.Schema({
    facebookId:{
        type: String,
        require:true
    }
})
fbschema.plugin(findOrCreate);
module.exports = new mongoose.model('fbauth',fbschema);