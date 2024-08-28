from django.db import models

# Create your models here.

class Job(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    link = models.URLField(null=True, blank=True)
    applied = models.BooleanField(default=False)
    pay = models.CharField(max_length=200)
    date_applied = models.DateField(null=True, blank=True)
    description = models.TextField()
    status_choices = [
        ('Offer', 'Offer'),
        ('Rejected', 'Rejected'),
        ( 'Interviewing', 'Interviewing'),
        ('Waiting', 'Waiting')
    ]
    status = models.CharField(max_length=12, choices=status_choices, default='Waiting')

    def __str__(self):
        return f"{self.title} at {self.comanpy}"

class Interview(models.Model):
    job = models.ForeignKey(Job, related_name='interviews', on_delete=models.CASCADE)
    type = models.CharField(max_length=200)
    round = models.CharField(max_length=50)
    interviewer = modelsCharField(max_length=200,  blank=True)
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



     
