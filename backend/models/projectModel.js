const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new Schema({
    photo:{
        type: String,
    },
    name:{
        type: String,
    },
    user_id:{
        type: String,
    },
    description:{
        type: String,
    },
    repo:{
        type: String,
    },
    demo:{
        type: String,
    },
    type:{
        type: String,
    },
    technologies:{
        type: Array,
    },
    views:{
        type: Number,
    }
},
{timestamps: true})

module.exports = mongoose.model('project', projectSchema)

