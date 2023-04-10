const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
    type: String,
    },
    id: {
    type: String,
    },
    url: {
    type: String,
    },
    images: {
    type: [String],
    },
    });
    
    const ConcertModelSchema = new Schema({
    city: {
    type: String,
    // default: "New York",
    },
    events: {
    type: [EventSchema],
    // default: [],
    },
    });

module.exports = mongoose.model("concert", ConcertModelSchema, "concerts");
