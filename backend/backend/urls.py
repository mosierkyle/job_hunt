"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('jobs.urls')),
#     path('api/', include('interviews.urls'))
# ]

from django.urls import path, include
from interviews.views import InterviewList, InterviewDetail
from jobs.views import JobDetail, JobList
from users.views import CustomUserRegister, CustomUserDetail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/interviews/', InterviewList.as_view(), name='interview-list'),
    path('api/interviews/<int:pk>/', InterviewDetail.as_view(), name='interview-detail'),
    path('api/jobs/', JobList.as_view(), name='job-list'),
    path('api/jobs/<int:pk>/', JobDetail.as_view(), name='job-detail'),
    path('api/register/',CustomUserRegister.as_view(), name='user-register'),
    path('api/user/',CustomUserDetail.as_view(), name='user-detail')
]

