from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
AbstractUser
class User():
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField()
    pass

def __str__(self):
    return f"{first_name} {last_name}"