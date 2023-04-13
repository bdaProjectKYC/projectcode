const express = require('express');
const router = express.Router();
// Require the concerts model
const Concert = require('../models/Concert');
console.log("Inside file");
/* GET concerts */

router.get('/', async (req, res, next) => {
    // We look for a query parameter "search"
    console.log("Inside backend");

        concerts = await Concert.find();
  
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched concerts',
      data: { concerts },
    });
  });

  module.exports = router;