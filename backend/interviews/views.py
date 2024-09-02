from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response 
from .models import Interview
from .serializers import InterviewSerializer, InterviewDetailsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class InterviewList(APIView):
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fiels = ['round', 'type', 'status']
    search_fields = ['interviewer']
    ordering_fields = ['date', 'round']

    def get(self, request):
        queryset = Interview.objects.all()
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(request, queryset, self)
        serializer = InterviewSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = InterviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(request.data, status=status.HTTP_201_CREATED)
        else:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)

class InterviewDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_interview_object(self, pk):
        try:
            return Interview.objects.get(pk=pk)
        except Interview.DoesNotExist:
            return Http404
        
    def get(self, request, pk):
        interview = self.get_interview_object(pk)
        serializer = InterviewDetailsSerializer(interview)
        return Response(serializer.data)
    
    def put(self, request, pk):
        interview = self.get_interview_object(pk)
        serializer = InterviewDetailsSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        interview = self.get_interview_object(pk)
        serializer = InterviewDetailsSerializer(interview, request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk):
       interview = self.get_interview_object(pk)
       interview.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)
