from os import stat
from urllib.request import Request
from django.shortcuts import render
from django.db.models import QuerySet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import NGOSerializer
from .models import NGO
from rest_framework.serializers import ValidationError
# Create your views here.

class NGOList(APIView):
    
    def queryset(self, request : Request) -> QuerySet:
        return NGO.objects.all()
    
    def search(self, request : Request) -> QuerySet:
        if request.method == 'GET':
            params = request.query_params
        
        base = self.queryset(request)
        for k, v in params.items():
            try:
                base = base.filter(**{k : v})
            except: raise ValidationError({'field' : f'{k} does not exist'})
        return base
    
    def get(self, request : Request):
        queryset    = self.search(request)
        return Response(
            status = status.HTTP_200_OK, 
            data = NGOSerializer(queryset, many = True).data
        )