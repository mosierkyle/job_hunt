from rest_framework import serializers
from .models import CustomerUser
from django.contrib.auth.password_validation import validate_password

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomerUser
        fields = ['id', 'email', 'password','password2','first_name', 'last_name']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs


    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomerUser.objects.create_user(**validated_data)
        return user

class CustomUserUpdateSerializer(serializers.ModelSerializer):
     class Meta:
        model = CustomerUser
        fields = ['id', 'email', 'password']
       

