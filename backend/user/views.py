from os import stat
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User

# Create your views here.

class UserSignin(APIView):
    def post(self, request):
        data = request.data
        if User.objects.filter(username = data['username']).exists():
            return Response("User is already signed up", status = 401)
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = 200)
        return Response(serializer.errors, status = 400)

class UserLogin(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(username = data['username'])
            if user.password != data['password']:
                return Response("Wrong password", status = 401)
            return Response(user.public_key, status=200)
        except:
            return Response("User does not exist", status = 404)