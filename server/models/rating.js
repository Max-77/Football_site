const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const schema = new Schema({
    name:{
        type: String
    },
    rating:{
        type: Number
    },
    count:{
        type: Number
    }
})

const Rating = mongoose.model('Rating', schema)

module.exports = Rating