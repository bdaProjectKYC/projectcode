const grpc = require("@grpc/grpc-js");
const PROTO_PATH = 'grpc/news.proto';
var protoLoader = require("@grpc/proto-loader");
const natural = require("natural");
const aposToLexForm = require("apos-to-lex-form");
const SW = require("stopword");
const SpellCorrector = require("spelling-corrector");
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);


function startGRPCServer() {
    const grpcServer = new grpc.Server();
    grpcServer.addService(newsProto.NewsService.service, {
        getAnalysis: getAnalysis,
      });
      return grpcServer;

}
function computeAnalysis(request){
    //console.log(request);
    var analysisValue = generateAnalysis(request.summary);
    var analysis;
    if(analysisValue>0){
        analysis="POSITIVE";
    }else if(analysisValue < 0){
        analysis="NEGATIVE";
    }else{
        analysis="NEUTRAL";
    }
    var response ={
        city : request.city,
        summary : request.summary,
        analysis: analysis
    }
    return response;
}

function getAnalysis(call, callback) {
    console.log("Inside getAnalysis");
    callback(null, computeAnalysis(call.request));
 }

  function generateAnalysis(review) {
    const lexedReview = aposToLexForm(review);
    const casedReview = lexedReview.toLowerCase();
    const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, "");
    const { WordTokenizer } = natural;
    const tokenizer = new WordTokenizer();
    const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
    tokenizedReview.forEach((word, index) => {
      tokenizedReview[index] = spellCorrector.correct(word);
    });
    const filteredReview = SW.removeStopwords(tokenizedReview);
    const { SentimentAnalyzer, PorterStemmer } = natural;
    const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
    return (analyzer.getSentiment(filteredReview));
  }


var routeServer = startGRPCServer();
  routeServer.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    routeServer.start();
    console.log('gRPC server started on port 50051');
  });

  module.exports = {
    startGRPCServer,
  };
