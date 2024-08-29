from rest_framework import serializers
from .models import Interview

class InterviewSerializer(serializers.ModelSerializer):
    class Meta():
        model = Interview
        fields = [
            'id',
            'user',
            'job',
            'type',
            'round',
            'interviewer',
            'status',
            'date',
            'questions_answers',        
            'final_questions',
            'notes'
        ]



class InterviewDetailsSerializer(InterviewSerializer):
    job = serializers.SerializerMethodField()

    class Meta(InterviewSerializer.Meta):
        fields = InterviewSerializer.Meta.fields + ['job']

    def get_job(self, obj):
        from jobs.serializers import JobSerializer
        return JobSerializer(obj.job).data
