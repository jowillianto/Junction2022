from lib2to3.pgen2 import token
from os import stat
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from user.auth import UserAuthentication, UserPermissions
from .serializers import UserSerializer
from .models import User, Token

# Create your views here.

class UserRegister(APIView):
    def post(self, request):
        data = request.data
        if User.objects.filter(username = data['username']).exists():
            return Response("User is already signed up", status = 401)
        serializer = UserSerializer(data = data)
        if serializer.is_valid():
            user    = serializer.save()
            token   = Token.create(user)
            token.save()
            return Response(data = {'token' : token.token}, status = 200)
        return Response(serializer.errors, status = 400)

class UserLogin(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(username = data['username'])
            if user.password != data['password']:
                return Response("Wrong password", status = 401)
            token   = Token.create(user)
            token.save()
            return Response(user.public_key, status=200)
        except:
            return Response("User does not exist", status = 404)

class UserCheckLogin(APIView):
    authentication_classes = [UserAuthentication]
    permission_classes     = [UserPermissions]
    def get(self, request):
        return Response(status = 200)