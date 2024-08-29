from django.db import models
from users.models import User
from jobs.models import Job


# Create your models here.

class Interview(models.Model):
    user = models.ForeignKey(User,related_name='interviews', on_delete=models.CASCADE)
    job = models.ForeignKey(Job, related_name='interviews', on_delete=models.CASCADE)
    type = models.CharField(max_length=200)
    round = models.CharField(max_length=50)
    interviewer = models.CharField(max_length=200,  blank=True)
    status_choices = [
        ('Upcoming', 'Upcoming'),
        ('Past', 'Past'),
    ]
    status = models.CharField(max_length=8, choices=status_choices, default='Upcoming')
    date = models.DateTimeField()
    questions_answers = models.TextField()
    final_questions = models.TextField()
    notes = models.TextField()

    def __str__(self):
        return f"{round} round {type} interview with {self.job.company} for {self.job.title}"


