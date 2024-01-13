const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userdetailsSchema = new Schema({
    user_id:{
        type: String,
    },
    type:{
        type: String,
    },
    experience:{
        type: Number,
    },
    location:{
        type: String,
    },
    photo:{
        type: String,
    },
    website:{
        type: String,
    },
    repo:{
        type: String,
    },
},
{timestamps: true})

module.exports = mongoose.model('userdetails', userdetailsSchema)