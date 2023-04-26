const express = require("express");
const router = express.Router();
const News = require('../models/NewsModel');
const { response } = require("../app");
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = './grpc/news.proto';
const protoLoader = require('@grpc/proto-loader');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);
const myService = newsProto.NewsService;

/* GET news stories for a city */
router.get("/:city", async (req, res, next) => {
  try {
    const city = req.params.city;
    const news = await News.findOne({ place: city });
    var newsAnalysis = [];
    const client = new myService('localhost:50051', grpc.credentials.createInsecure());
    for(let i = 0; i< news.articles.length; i++){
      // Make a gRPC call to another service
      var summary = news.articles[i].snippet;
    const grpcPromise = new Promise((resolve, reject) => {
      client.GetAnalysis({ city, summary }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    const grpcResponse = await grpcPromise;
    newsAnalysis.push(grpcResponse);
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
      analysis : {newsAnalysis}
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