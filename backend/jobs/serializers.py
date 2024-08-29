from rest_framework import serializers
from .models import *
from interviews.serializers import InterviewSerializer

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'  #['id, title, company, link, applied, pay, date_applied, description, status']

class JobDetailSerializer(JobSerializer):
    interviews = serializers.SerializerMethodField()

    class Meta(JobSerializer.Meta):
        fields = JobSerializer.Meta.fields + ['interviews']

    def get_interviews(self, obj):
        return InterviewSerializer(obj.interviews.all(), many=True).data