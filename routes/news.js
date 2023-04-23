const express = require("express");
const router = express.Router();
const News = require('../models/NewsModel');
const grpc = require('../grpc/grpcClient');
console.log("Inside news file");

/* GET news stories for a city */
router.get("/:city", async (req, res, next) => {
  try {
    const city = req.params.city;
    const news = await News.findOne({ place: city });
    //console.log(news);
    for(let i = 0; i< news.articles.length; i++){
      console.log(news.articles[i].snippet);
      grpc.makeGrpcCall(city, news.articles[i].snippet);
    }
    if (!news) {
      return res.status(404).json({
        statusCode: 404,
        message: "News data not found for the city",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Fetched News data for the city",
      data: { news },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to fetch news data for the city",
      error: error.message,
    });
  }
});

module.exports = router;