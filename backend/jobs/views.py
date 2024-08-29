from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response 
from .models import Job
from .serializers import JobSerializer, JobDetailSerializer
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class JobList(APIView):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'company', 'title', 'applied']
    search_fields = ['company', 'title', 'description']
    ordering_fields = ['date_applied', 'pay']

    def get(self, request):
        queryset = Job.objects.all()
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(request, queryset, self)
        serializer = JobSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobDetails(APIView):
    def get_job_object(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            return Http404
    
    def get(self, request, pk):
        job = self.get_job_object(pk)
        serializer = JobDetailSerializer()
        return Response(serializer.data)

    def put(self, request, pk):
        job = self.get_job_object(pk)
        serializer = JobDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(erializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request, pk):
        job = self.get_job_object(pk)
        serializer = JobDetailSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(erializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        job = self.get_job_object(pk)
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)