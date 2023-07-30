from .jwt_util import JWTUtil
from rest_framework import permissions

class JWTPermission(permissions.BasePermission):
    message = 'Your token is invalid or expired.'

    def has_permission(self, request, view):
        return JWTUtil.verify_jwt(request)
    

class IsAuthorized(permissions.BasePermission):
    message = "you don't have authorization to do this."

    def has_permission(self, request, view):

        if request.GET:
            return True
        elif request.POST or request.PUT:
            return JWTUtil.get_user(request) == self.get_user(request)
        elif request.DELETE:
            return JWTUtil.get_user(request) == self.get_user_for_delete(request)

    def get_user(self, request):
        request.data

    def get_user_for_delete(self, request):
        request.data

