from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from phonenumbers import is_valid_number
from django.core.validators import EmailValidator
from django import forms




class UserSerializer(serializers.ModelSerializer):
      class Meta:
            model = CustomUser
            fields = ('id', 'email', 'first_name', 'last_name', 'gender', 'phone_number', 'profile_image')


class CreateUserSerializer(serializers.ModelSerializer):
      class Meta:
            model = CustomUser
            fields = ('id', 'email', 'first_name', 'last_name', 'gender', 'phone_number', 'profile_image', 'password')
            extra_kwargs = {  
                  'password': {'required': True},
                  'is_superuser': {'read_only': True},  
                  'is_staff': {'read_only': True},  
            }

      def validate(self, attrs):
            email = attrs.get('email', '').strip().lower()
            if CustomUser.objects.filter(email=email).exists():
                  raise serializers.ValidationError('User with this email id already exists.')           
            return attrs

      def create(self, validated_data):
            user = CustomUser.objects.create_user(**validated_data)
            return user


class UpdateUserSerializer(serializers.ModelSerializer):
      class Meta:
            model = CustomUser
            fields = ('id', 'email', 'first_name', 'last_name', 'gender', 'phone_number', 'profile_image', 'password')

      def update(self, instance, validated_data):
            try:
                  password = validated_data.pop('password')
                  if password:
                        instance.set_password(password)
            except:
                  pass
            instance = super().update(instance, validated_data)
            print("Instance from serializer:", instance)
            return instance

class RefreshUserSerializer(serializers.ModelSerializer):
      class Meta:
            model = CustomUser
            fields = ('id', 'email', 'first_name', 'last_name', 'gender', 'phone_number', 'profile_image')

class GetUserSerializer(serializers.ModelSerializer):
      class Meta:
            model = CustomUser
            fields = ('id', 'email', 'first_name', 'last_name', 'gender', 'phone_number', 'profile_image')

class LoginSerializer(serializers.Serializer):
      email = serializers.EmailField()
      password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)

      def validate(self, attrs):
            email = attrs.get('email').lower()
            password = attrs.get('password')

            if not email or not password:
                  raise serializers.ValidationError("Please give both email and password.")

            if not CustomUser.objects.filter(email=email).exists():
                  raise serializers.ValidationError('Email does not exist.')

            user = authenticate(request=self.context.get('request'), email=email,
                              password=password)
            if not user:
                  raise serializers.ValidationError("Wrong Credentials.")

            attrs['user'] = user
            return attrs