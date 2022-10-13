FROM ubuntu:20.04
RUN apt-get update && apt-get install -y tzdata && apt install -y python3.8 python3-pip nano busybox
RUN apt install python3-dev libpq-dev nginx -y
COPY . .
RUN pip install -r back/requirements.txt

RUN python3 back/todo/manage.py makemigrations

EXPOSE 8000
