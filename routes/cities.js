const express = require('express');
const router = express.Router();
// Require the city model
const City = require('../models/City');
console.log("Inside file");
/* GET cities */

router.get('/', async (req, res, next) => {
    // We look for a query parameter "search"
    console.log("Inside backend");
    const { search } = req.query;
    let cities;
    if (search) { // If search exists, the user typed in the search bar
        cities = await City.aggregate(
        [
          {
            '$search': {
                'index': 'citySearch', 
              'autocomplete': {
                'query': search, // noticed we assign a dynamic value to "query"
                'path': 'city'
              }
            }
          }, {
            '$project': {
                'city': 1
            }
          }
        ]
      );
    } else { // The search is empty so the value of "search" is undefined
        cities = await City.find();
    }
  
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched cities',
      data: { cities },
    });
  });

  module.exports = router;