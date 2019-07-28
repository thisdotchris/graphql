const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: String,
    color: String,
    tranmition: String,
    manufacturer: {
        type: Schema.Types.ObjectId,
        ref: 'manufacturers'
    }
})

module.exports = mongoose.model('cars', carSchema);