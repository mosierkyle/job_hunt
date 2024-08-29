from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = fields = [
            'id',
            'user',
            'title',
            'company',
            'link',
            'applied',
            'pay',
            'date_applied',
            'description',
            'status',
            'notes'
        ]

class JobDetailSerializer(JobSerializer):
    interviews = serializers.SerializerMethodField()

    class Meta(JobSerializer.Meta):
        fields = JobSerializer.Meta.fields + ['interviews']

    def get_interviews(self, obj):
        from interviews.serializers import InterviewSerializer
        return InterviewSerializer(obj.interviews.all(), many=True).data