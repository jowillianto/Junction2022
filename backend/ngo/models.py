from ast import Delete
from django.db import models
from user.models import User

# Create your models here.

class NGO(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default=None)
    avatar = models.ImageField(upload_to="avatar")
    staff = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
