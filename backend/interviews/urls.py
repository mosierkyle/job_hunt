from django.urls import path, include
from views import InterviewList, InterviewDetails

urlpatterns = [
    path('interviews/', InterviewList.as_view(), name='interview-list'),
    path('interviews/<int:pk>/', InterviewDetails.as_view(), name='interview-detail')
]