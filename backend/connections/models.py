
from django.db import models
from users.models import CustomerUser

# Create your models here.
class Connection(models.Model):
    user = models.ForeignKey(CustomerUser, related_name='connections', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    company = models.CharField(max_length=200, blank=True, null=True)
    connected = models.BooleanField(default=False)
    talked = models.BooleanField(default=False)
    referral = models.BooleanField(default=False)
    link = models.URLField()
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} at {self.company}"
