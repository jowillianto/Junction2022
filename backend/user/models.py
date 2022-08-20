from django.db import models

import random
import string

def random_string(length : int = 20):
    return ''.join([random.choice(string.ascii_letters) for i in range(length)])
    
# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    public_key = models.TextField(default=None)
    password = models.CharField(max_length=100)
    email = models.EmailField()

class Token(models.Model):
    token   = models.CharField(max_length = 40)
    user    = models.OneToOneField(to = User, primary_key = True, on_delete=models.CASCADE)

    @staticmethod
    def create(user : User):
        if hasattr(user, 'token'):
            user.token.delete()
        return Token(
            token = random_string(40),
            user  = user
        )