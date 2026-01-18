from django.urls import path
from . import views

urlpatterns = [
    path('microsoft_login/', views.microsoft_login, name='microsoft_login'), 
    path('list_reports/', views.list_reports, name='list_reports'),
    path('view_report/', views.view_report, name='view_report'),
    path('create_user/', views.create_user, name='create_user'),
    path('check_user_exists/<str:email>', views.check_user_exists, name='check_user_exists'),

    ]