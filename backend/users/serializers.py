from rest_framework import serializers
from .models import CustomerUser
from django.contrib.auth.password_validation import validate_password

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = CustomerUser
        fields = ['id', 'email', 'password','first_name', 'last_name']

    def create(self, validated_data):
        user = CustomerUser.objects.create_user(**validated_data)
        return user

class CustomUserUpdateSerializer(serializers.ModelSerializer):
     class Meta:
        model = CustomerUser
        fields = ['last_name', 'first_name', 'email']
       

