from rest_framework import serializers
from models import Interview
from .jobs.serializers import JobDetailSerializer

class InterviewSerializer(serializers.ModelSerializer):
    class Meta():
        model = Interview
        fields = '__all__'


class InterviewSerializerDetails(InterviewSerializer):
    job = serializers.SerializerMethodField()

    class Meta(InterviewSerializer.Meta):
        fields = InterviewSerializer.Meta + ['job']

    def get_job(self, obj):
        return JobDetailSerializer(obj.job).data


