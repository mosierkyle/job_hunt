from django.urls import path, include
from views import JobDetails, JobList

urlpatterns = [
    path('/jobs', JobList.as_view(), name='job-list'),
    path('/jobs/<int:pk>/', JobDetails.as_view(), name='job-detail')
]