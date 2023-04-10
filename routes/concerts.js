const express = require('express');
const router = express.Router();
// Require the city model
const Concert = require('../models/Concert');
console.log("Inside file");
/* GET concerts */

router.get('/concerts', async (req, res, next) => {
    // We look for a query parameter "search"
    console.log("Inside backend");
    // const { city } = req.query;
    // let concerts;
    // if (search) { // If search exists, the user typed in the search bar
    //     concerts = await Concert.aggregate(
    //     [
    //       {
    //         '$search': {
    //             // 'index': 'concertSearch', 
    //           'autocomplete': {
    //             'query': city, // noticed we assign a dynamic value to "query"
    //             'path': 'concert'
    //           }
    //         }
    //       }, {
    //         '$project': {
    //          'concert': 1
    //         }
    //       }
    //     ]
    //   );
    // } else { // The search is empty so the value of "search" is undefined
        concerts = await Concert.find();
    // }
  
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched concerts',
      data: { concerts },
    });
  });

  module.exports = router;