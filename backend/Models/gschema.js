const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const gschema = new mongoose.Schema({
    googleId:{
        type: String,
        require:true
    }
})
gschema.plugin(findOrCreate);
module.exports = new mongoose.model('gauth',gschema);