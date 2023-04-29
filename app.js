var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const client = require('prom-client');
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://shka5709:bdaData123@cluster0.1ng1cvf.mongodb.net/bda_data?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

var indexRouter = require("./routes/index");
var citiesRouter = require("./routes/cities");
var weatherRouter = require("./routes/weather");
var newsRouter = require("./routes/news");
var concertsRouter = require("./routes/concerts");
var placesToVisitRouter = require("./routes/placesToVisit");

// Create a Registry to register the metrics
const register = new client.Registry();

client.collectDefaultMetrics({
    app: 'node-application-monitoring-app',
    prefix: 'node_',
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
    register
});


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/cities", citiesRouter);
app.use("/weather", weatherRouter);
app.use("/news", newsRouter);
app.use("/concerts", concertsRouter);
app.use("/placesToVisit", placesToVisitRouter);


app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  return res.status(200).send(await register.metrics());
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
