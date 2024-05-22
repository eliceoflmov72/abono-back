const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, { _id: false }); // Desactiva el _id para coordinates

const validPeriodSchema = new mongoose.Schema({
    start_date: {
        type: Date,
        required: false
    },
    end_date: {
        type: Date,
        required: false
    }
}, { _id: false }); // Desactiva el _id para valid_period

const passSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    coordinates: [coordinateSchema],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    valid_period: validPeriodSchema,
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { versionKey: false }); // Desactiva el campo __v

const Pass = mongoose.model('Pass', passSchema);

module.exports = Pass;
