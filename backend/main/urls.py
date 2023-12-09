from django.urls import path
from .views import user_views, company_views, product_views
from knox.views import LogoutView, LogoutAllView


urlpatterns = [
      #USERS
      path('users/register/', user_views.CreateUserAPI.as_view()),
      path('users/update/<int:pk>/', user_views.UpdateUserAPI.as_view()),
      path('users/refresh/', user_views.RefreshUserAPI.as_view()),
      path('users/login/', user_views.LoginAPIView.as_view()),
      path('users/logout/', LogoutView.as_view()),
      path('users/logout-all/', LogoutAllView.as_view()),
      #only admins     
      path('users/get/<int:pk>/', user_views.GetUserAPI.as_view()),

      #COMPANY - COMPANYINFO
      path('company-info/create/', company_views.CompanyInfoCreateView.as_view(), name='company-info-create'),
      path('company-info/get/', company_views.CompanyInfoGetView.as_view(), name='company-info-get'),
      path('company-info/edit/', company_views.CompanyInfoUpdateView.as_view(), name='company-info-edit'),
      path('company-info/delete/', company_views.CompanyInfoDeleteView.as_view(), name='company-info-delete'),
      path('company/create/', company_views.CompanyCreateView.as_view(), name='company-create'), #falta 


      #PRODUCT - PRODUCTINSTANCE
      path('product/get-options/', product_views.GetProductOptionsView.as_view(), name='product-get-options'),
      path('product-instance/create/', product_views.ProductInstanceCreateView.as_view(), name='product-instance-create'),
      path('product-instance/cotization/', product_views.ProductInstanceCotizator.as_view(), name='product-instance-cotizator'),


]