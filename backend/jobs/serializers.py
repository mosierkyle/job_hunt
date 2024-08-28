from rest_framework import serializers
from .models import *

class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__' #['id, type, round, interviewer, status, date, questions_answers, final_questions, notes']


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__' #['id, title, company, link, applied, pay, date_applied, description, status']
