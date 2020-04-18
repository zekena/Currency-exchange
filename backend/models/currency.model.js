const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const currencySchema = new Schema({
    currencyCode: {
        type: String,
        required: true,
        unique: true
    },
    currencyName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40
    },
    rateToEuro: {
        type: Number
    }
},{
    timestamps: true,
});

currencySchema.plugin(uniqueValidator);
const currency = mongoose.model('currency' ,currencySchema);

module.exports = currency;
