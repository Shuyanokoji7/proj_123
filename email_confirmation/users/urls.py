
from django.urls import path
from . import views

urlpatterns = [
    path('', views.register, name='register'),
    path('confirm/', views.confirm_email, name='confirm_email'),
    path('users/', views.user_list, name='user_list'),
]