FROM ubuntu:bionic

RUN apt-get update
RUN apt-get install python3 python3-pip -y
RUN pip3 install grpcio protobuf==3.19.6

ADD grpc /app/grpc

CMD [ "python3", "grpcServer.py"]