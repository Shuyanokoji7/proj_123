from rest_framework import serializers
from user.models import User 
from rest_framework.authtoken.models import Token
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'role']

    def create(self, validated_data):
        random_password = get_random_string(12)  
        user = User(**validated_data)
        user.set_password(random_password)  
        user.save()

        token, _ = Token.objects.get_or_create(user=user)

        send_mail(
            'Your New Account Details',
            f'Hello {user.username},\n\nYour account has been created successfully!\n'
            f'Your login credentials:\n'
            f'Username: {user.username}\n'
            f'Password: {random_password}\n'
            f'Auth Token: {token.key}\n\n'
            'Please change your password after logging in.',
            settings.EMAIL_HOST_USER,  # Sender email
            [user.email],  # Recipient email
            fail_silently=False,
        )

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(username=data['username'], password=data['password'])

        if user is None:
            raise serializers.ValidationError("Invalid username or password")

        token, _ = Token.objects.get_or_create(user=user)

        return {'token': token.key, 'user': UserSerializer(user).data}