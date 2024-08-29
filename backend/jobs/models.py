from django.db import models
from user.models import User

# Create your models here.

class Job(models.Model):
    user = models.ForeignKey(User, related_name='jobs', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    link = models.URLField(null=True, blank=True)
    applied = models.BooleanField(default=False)
    pay = models.IntegerField(null=True, blank=True)
    date_applied = models.DateField(null=True, blank=True)
    description = models.TextField()
    status_choices = [
        ('Offer', 'Offer'),
        ('Rejected', 'Rejected'),
        ( 'Interviewing', 'Interviewing'),
        ('Waiting', 'Waiting')
    ]
    status = models.CharField(max_length=12, choices=status_choices, default='Waiting')
    notes = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.company}"




     
