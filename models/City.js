const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CityModelSchema = new Schema({
  city: {
    type: String,
  },
  city_ascii: {
    type: String,
  },
  state_id: {
    type: String,
  },
  state_name: {
    type: String,
  },
  county_fips: {
    type: String,
  },
  county_name: {
    type: String,
  },
  lat: {
    type: String,
  },
  lon: {
    type: String,
  },
  population: {
    type: Number,
  },
  density: {
    type: Number,
  },
  source: {
    type: String,
  },
  military: {
    type: String,
  },
  incorporated: {
    type: String,
  },
  timezone: {
    type: String,
  },
  ranking: {
    type: String,
  },
  zips: {
    type: String,
  },
  id: {
    type: String,
  },
});

module.exports = mongoose.model("city", CityModelSchema, "cities");
