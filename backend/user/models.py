from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    public_key = models.TextField(default=None)
    password = models.CharField(max_length=100)
    email = models.EmailField()