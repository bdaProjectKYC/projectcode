import grpc
from concurrent import futures
from flair.nn import Classifier
from flair.data import Sentence
import news_pb2_grpc as pb2_grpc
import news_pb2 as pb2
# load the model
tagger = Classifier.load('sentiment')


class NewsServer(pb2_grpc.NewsServiceServicer):

    def GetAnalysis(self, request, context):
        city = request.city
        summary = request.summary
        print(request)
        sentence = Sentence(summary)
        tagger.predict(sentence)
        analysis=None
        for label in sentence.get_labels():
            analysis = label.value
        result = {'city': city, 'analysis': analysis, 'summary': summary}
        return pb2.NewsResponse(**result)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_NewsServiceServicer_to_server(NewsServer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started")
    server.wait_for_termination()
    
    
if __name__ == '__main__':
    serve()