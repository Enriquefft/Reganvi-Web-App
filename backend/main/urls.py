from django.urls import path
from . import views
from knox.views import LogoutView, LogoutAllView


urlpatterns = [
      path('users/register/', views.CreateUserAPI.as_view()),
      path('users/update/<int:pk>/', views.UpdateUserAPI.as_view()),
      path('users/refresh/', views.RefreshUserAPI.as_view()),
      path('users/login/', views.LoginAPIView.as_view()),
      path('users/logout/', LogoutView.as_view()),
      path('users/logout-all/', LogoutAllView.as_view()),
      #only admins     
      path('users/get/<int:pk>/', views.GetUserAPI.as_view()),
]