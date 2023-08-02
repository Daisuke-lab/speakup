from accounts.models import Profile
from utils.jwt_util import JWTUtil
from rest_framework import permissions
from django.shortcuts import get_object_or_404


class JWTPermission(permissions.BasePermission):
    message = 'Your token is invalid or expired.'

    def has_permission(self, request, view):
        return True
        return JWTUtil.verify_jwt(request)
    

class IsAuthorizedForUpdateOrDelete(permissions.BasePermission):
    message = "you don't have authorization to do this."

    def has_permission(self, request, view):

        if request.GET or request.POST:
            return True
        else:
            return JWTUtil.get_user(request) == self.get_user(request)

    def get_user(self, request):
        pk = request.resolver_match.kwargs.get("pk")
        
        if "profiles" in request.path:
            profile = get_object_or_404(Profile, id=pk)
            return profile.user
        

