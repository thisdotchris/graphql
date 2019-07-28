const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
    name: String,
    country: String,
    cars: [
        {
            type: Schema.Types.ObjectId,
            ref: 'cars'
        }
    ]
})

module.exports = mongoose.model('manufacturers', manufacturerSchema);