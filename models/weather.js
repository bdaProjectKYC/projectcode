const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeatherModelSchema = new Schema({
  city: {
    type: String,
  },
  forecast: [{
    date: {
      type: String,
    },
    condition: {
      type: String,
    },
    maxtemp_c: {
      type: Number,
    },
    mintemp_c: {
      type: Number,
    },
    maxtemp_f: {
      type: Number,
    },
    mintemp_f: {
      type: Number,
    },
    maxwind_kph: {
      type: Number,
    },
    maxwind_mph: {
      type: Number,
    },
  }],
});

module.exports = mongoose.model("Weather", WeatherModelSchema, "weather");