
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .serializers import ProfileSerializer, ImageSerializer
from .models import Profile, Image
from .filters import ProfileFilter
import django_filters.rest_framework
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseRedirect
# from PIL import Image
import os
from django.conf import settings
from django.core import serializers
from rest_framework import permissions
from config.permissions import IsAuthorizedForUpdateOrDelete, JWTPermission



class ProfileListCreateView(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [JWTPermission]
    filter_class = ProfileFilter


class ProfileRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [JWTPermission, IsAuthorizedForUpdateOrDelete]


class ImageListCreateView(ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [JWTPermission]


class ImageRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [JWTPermission, IsAuthorizedForUpdateOrDelete]




















