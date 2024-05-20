const { model, Schema } = require('mongoose');

// Location Schema
const locationSchema = new Schema({
    latitude: String,
    longitude: String
});

// Route Schema
const routeSchema = new Schema({
    coordinates: [locationSchema],
    name: String,
    description: String,
    valid_period: {
        start_date: Date,
        end_date: Date
    },
    price: Number,
    image: String
});

// Provider Schema
const providerSchema = new Schema({
    name: String,
    routes: [routeSchema]
});

// Generic Bus Schema
const genericBusSchema = new Schema({
    Alsa: [routeSchema],
    Guadalajara: [routeSchema],
    Cordoba: [routeSchema]
});

// Main Schema for Passes
const passesSchema = new Schema({
    generic_bus: [genericBusSchema]
});

exports.Location = model('Location', locationSchema);
exports.GenericBus = model('GenericBus', genericBusSchema);
exports.Passes = model('Passes', passesSchema);
