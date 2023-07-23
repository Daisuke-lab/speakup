from .jwt_util import JWTUtil
from rest_framework import permissions

class CustomerAccessPermission(permissions.BasePermission):
    message = 'Your token is invalid or expired.'

    def has_permission(self, request, view):
        return JWTUtil.verify_jwt(request)