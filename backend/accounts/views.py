
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .serializers import LanguageSerializer, NationalitySerializer, ProfileSerializer, ImageSerializer
from .models import Language, Nationality, Profile, Image
from .filters import ProfileFilter
import django_filters.rest_framework
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseRedirect
# from PIL import Image
import os
from django.conf import settings
from django.core import serializers
from rest_framework import permissions
from rest_framework.permissions import AllowAny
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

class NationalityListCreateView(ListCreateAPIView):
    queryset = Nationality.objects.all()
    serializer_class = NationalitySerializer
    permission_classes = [AllowAny]


class LanguageListCreateView(ListCreateAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [AllowAny]




class ImageListCreateView(ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [JWTPermission]


class ImageRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [JWTPermission, IsAuthorizedForUpdateOrDelete]




















