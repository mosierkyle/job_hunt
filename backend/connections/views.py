from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response 
from .models import Connection
from .serializers import ConnectionSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ConnectionList(APIView):
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['connected', 'talked', 'referral']
    search_fields = ['company', 'name']
    ordering_fields = ['created_at']

    def get(self, request):
        queryset = Connection.objects.all()
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(request, queryset, self)
        serializer = ConnectionSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ConnectionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(request.data, status=status.HTTP_201_CREATED)
        else:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)

class ConnectionDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_connection_object(self, pk):
        try:
            return Connection.objects.get(pk=pk)
        except Connection.DoesNotExist:
            raise Http404
        
    def get(self, request, pk):
        connection = self.get_connection_object(pk)
        serializer = ConnectionSerializer(connection)
        return Response(serializer.data)
    
    def put(self, request, pk):
        connection = self.get_connection_object(pk)
        serializer = ConnectionSerializer(connection, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        connection = self.get_connection_object(pk)
        serializer = ConnectionSerializer(connection, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk):
       connection = self.get_connection_object(pk)
       connection.delete()
       return Response(status=status.HTTP_204_NO_CONTENT)
