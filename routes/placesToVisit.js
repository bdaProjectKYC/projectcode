const express = require('express');
const router = express.Router();
// Require the PlacesToVisit model
const Places = require('../models/PlacesToVisit');
console.log("Inside file");

/* GET places to visit for a city */
router.get('/:city', async (req, res, next) => {
  try {
    console.log("Inside route places")
    const city = req.params.city;
    const places = await Places.findOne({ city: city });
    //const places = await Places.find();
    console.log(places);
    
    if (!places) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Places not found for the city',
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched places to visit data for the city',
      data: { places },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Failed to fetch places to visit data for the city',
      error: error.message,
    });
  }
});

module.exports = router;