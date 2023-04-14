const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
    },
    snippet: {
        type: String,
    },
    webUrl: {
        type: String,
    },
    pubDate: {
        type: String,
    },
    imageUrl: {
        type: String,
    }
})

const NewsModelSchema = new Schema({
    place: {
        type: String,
    },
    articles: [ArticleSchema]
})

module.exports = mongoose.model("NewsModel", NewsModelSchema, "news");