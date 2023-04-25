FROM dirkcgrunwald/flair:latest
LABEL MAINTAINER="dirk grunwald <grunwald@colorado.edu>"

RUN pip3 install pika redis jsonpickle requests

ADD grpc /app/grpc

CMD [ "python3", "grpcServer.py"]