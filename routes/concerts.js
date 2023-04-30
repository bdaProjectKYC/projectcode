const express = require("express"); // Importing the Express module
const router = express.Router(); // Router module creation
const Concert = require("../models/Concert"); // Require the concerts model

/* GET concerts */
router.get("/:city", async (req, res, next) => {
  const city = req.params.city;
  const concerts = await Concert.findOne({ city: city });
  if(concerts){
    // JSON response to client if data successful
    return res.status(200).json({
      statusCode: 200,
      message: "Fetched concerts",
      data: { concerts },
    });
  }else{
    // JSON response to client id data unsuccessful
    return res.status(404).json({
      message: "failed to Fetched concerts",
    });

  }

  
});

module.exports = router;
