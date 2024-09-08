from rest_framework import serializers
from .models import Connection


class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = [
            'id',
            'name',
            'company',
            'connected',
            'talked',
            'referral',
            'link',
            'notes'
        ]
    
    def create(self, validated_data):
        user = self.context.get('request').user
        validated_data['user'] = user
        return Connection.objects.create( **validated_data)
