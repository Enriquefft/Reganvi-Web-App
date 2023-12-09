from django.shortcuts import render
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from ..models import CustomUser
from ..serializers.user_serializers import CreateUserSerializer, UpdateUserSerializer, LoginSerializer, RefreshUserSerializer, GetUserSerializer
from knox import views as knox_views
from django.contrib.auth import login

from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class CreateUserAPI(CreateAPIView):
      """
      Creates user instance
      """
      queryset = CustomUser.objects.all()
      serializer_class = CreateUserSerializer
      permission_classes = (AllowAny,)


class UpdateUserAPI(UpdateAPIView):
      """
      Updates user instance
      """
      queryset = CustomUser.objects.all()
      authentication_classes = (TokenAuthentication,)
      permission_classes = (IsAuthenticated,)
      serializer_class = UpdateUserSerializer


class RefreshUserAPI(RetrieveAPIView):
      """
      Refreshes user instance
      """
      queryset = CustomUser.objects.all()
      authentication_classes = (TokenAuthentication,)
      permission_classes = (IsAuthenticated,)
      serializer_class = RefreshUserSerializer

      def get_object(self):
            return self.request.user


class GetUserAPI(RetrieveAPIView):
      queryset = CustomUser.objects.all()
      authentication_classes = (TokenAuthentication,)
      permission_classes = (IsAdminUser,)
      serializer_class = GetUserSerializer


class LoginAPIView(knox_views.LoginView):
      permission_classes = (AllowAny, )
      serializer_class = LoginSerializer

      def post(self, request, format=None):
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid(raise_exception=True):
                  user = serializer.validated_data['user']
                  login(request, user)
                  response = super().post(request, format=None)
            else:
                  return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            response = Response(response.data, status=status.HTTP_200_OK)
            response.delete_cookie('csrftoken')
            response.delete_cookie('sessionid')
            return response



