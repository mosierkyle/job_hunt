from django.contrib import admin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from django.urls import path, include
from django.urls import path, include
from interviews.views import InterviewList, InterviewDetail
from jobs.views import JobDetail, JobList
from users.views import CustomUserRegister, CustomUserDetail
from connections.views import ConnectionDetail, ConnectionList

urlpatterns = [
    path('admin/', admin.site.urls),
    #interviews
    path('api/interviews/', InterviewList.as_view(), name='interview-list'),
    path('api/interviews/<int:pk>/', InterviewDetail.as_view(), name='interview-detail'),
    #Jobs
    path('api/jobs/', JobList.as_view(), name='job-list'),
    path('api/jobs/<int:pk>/', JobDetail.as_view(), name='job-detail'),
    #user
    path('api/register/',CustomUserRegister.as_view(), name='user-register'),
    path('api/user/',CustomUserDetail.as_view(), name='user-detail'),
    #Connection
    path('api/connections/',ConnectionList.as_view(), name='connection-list'),
    path('api/connections/<int:pk>/',ConnectionDetail.as_view(), name='connection-detail'),
    #Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

