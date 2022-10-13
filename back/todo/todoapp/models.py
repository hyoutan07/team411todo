from django.db import models
from django.contrib.auth.models import User

# Create your models here

# User モデルの追加


# class User(models.Model):
#     user_id = models.IntegerField(primary_key=True)
#     password = models.CharField(max_length=128, default='')
#     name = models.CharField(max_length=255)

# Progress Master モデルの追加


class Progress_Master(models.Model):
    progress_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

# Task モデルの追加


class Task(models.Model):
    task_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255)
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    progress_id = models.ForeignKey(Progress_Master, on_delete=models.PROTECT)
    date = models.DateTimeField()
    detail = models.TextField()
    importance = models.CharField(max_length=10, default="Must")
