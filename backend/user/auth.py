import rest_framework.authentication as authentication
import rest_framework.exceptions as exception
import rest_framework.permissions as permission
from rest_framework.request import Request
from .models import User
from django.core.exceptions import ObjectDoesNotExist

class UserAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request : Request):
        token   = request.headers['Authorization'].split()[1]
        try:
            user    = User.objects.get(token = token)
        except ObjectDoesNotExist:
            raise exception.AuthenticationFailed('Lol')
        return (user, None)

class UserPermissions(permission.BasePermission):
    def has_permission(self, request, view):
        return request.user != None