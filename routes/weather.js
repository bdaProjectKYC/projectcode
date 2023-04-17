const express = require("express");
const router = express.Router();
const Weather = require("../models/weather");

/* GET weather data for a city */
router.get("/:city", async (req, res, next) => {
  try {
    const city = req.params.city;
    const weather = await Weather.findOne({ city: city });
    if (!weather) {
      return res.status(404).json({
        statusCode: 404,
        message: "Weather data not found for the city",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Fetched weather data for the city",
      data: { weather },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to fetch weather data for the city",
      error: error.message,
    });
  }
});

module.exports = router;
