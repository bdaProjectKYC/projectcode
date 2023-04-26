const express = require("express");
const router = express.Router();
const News = require('../models/NewsModel');
const grpc = require('../grpc/grpcClient');
const { response } = require("../app");

/* GET news stories for a city */
router.get("/:city", async (req, res, next) => {
  try {
    const city = req.params.city;
    const news = await News.findOne({ place: city });
    var dataAnalysis = [];
    for(let i = 0; i< news.articles.length; i++){
      grpc.makeGrpcCall(city, news.articles[i].snippet, function(err, message){
        if (err) {
          console.log(err);
        } else {
          //console.log(`Response Summary: ${message.summary}`);
          //console.log(`Response Analysis: ${message.analysis}`);
          dataAnalysis.push(message.analysis);
        }
      }
      );
    }
    console.log(`DataAnalysis: ${dataAnalysis}`);
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
      //analysis : {dataAnalysis}
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