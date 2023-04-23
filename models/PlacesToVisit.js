const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlacesSchema = new Schema({
    name: {
    type: String,
    },
    address: {
    type: [String],
    },
    phone: {
    type: String,
    },
    rating: {
    type: Number,
    },
	imageUrl: {
    type: String,
    },
	reviewCount: {
    type: Number,
    },
	URL: {
    type: String,
    },
    });
	
	

    const PlacesToVisitModelSchema = new Schema({
    city: {
    type: String,
    // default: "New York",
    },
    places: {
    type: [PlacesSchema],
    // default: [],
    },
    });

module.exports = mongoose.model("placesToVisit", PlacesToVisitModelSchema, "placesToVisit");