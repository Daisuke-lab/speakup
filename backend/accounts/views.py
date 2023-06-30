from django.shortcuts import render
from rest_framework.generics import GenericAPIView, RetrieveAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import ProfileSerializer, ImageSerializer
from .models import Profile, Picture
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from .filters import ProfileFilter
import django_filters.rest_framework
from django.http import JsonResponse, HttpResponse, Http404, HttpResponseRedirect
from django.core.files.storage import get_storage_class
from PIL import Image
import os
from django.conf import settings
from django.core import serializers
from rest_framework import permissions


User = get_user_model()

@api_view(['GET'])
def get_profile(request, pk):
    if pk:
        user = get_object_or_404(User, pk=pk)
        profile = get_object_or_404(Profile, user=user)
        serializer =ProfileSerializer(profile)

        return Response(serializer.data)

@api_view(['GET'])
def get_images(request, pk):
    images_list = []
    if pk:
        profile = get_object_or_404(Profile, pk=pk)
        images = Picture.objects.filter(album=profile)
        for image in images:
            url = get_object_or_404(Picture, id=image.id)
            picture = Image.open(url.image)
            cropped_image = picture.crop((url.x, url.y, url.x+url.width, url.y+url.height))
            images_list.append(cropped_image)


        # return JsonResponse({'images':images_list})
        

        
# class MyProfileView(GenericAPIView, RetrieveModelMixin,
# CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         return  self.create(request)
        
#     def get(self, request, pk=None):
#         if pk:
#             return self.retrieve(request,pk)
#         else:
#             return self.list(request)

#     def put(self, request, pk=None):
#         return self.update(request, pk)

#     def delete(self, request, pk=None):
#         return self.destroy(request, pk)

class ProfileListCreateView(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]


class ProfileRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.AllowAny]


class ProfileList(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filterset_class = ProfileFilter
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]


class ImageListCreate(ListCreateAPIView):
    queryset = Picture.objects.all()
    serializer_class = ImageSerializer



class ImageDetail(RetrieveUpdateDestroyAPIView):
    queryset = Picture.objects.all()
    serializer_class = ImageSerializer

    # def get(self, request, *args, **kwargs):
    #def get_queryset(self):
    def retrieve(self, request, *args, **kwargs):
        media_storage = get_storage_class()()
        images_list = []
        pk = self.kwargs['pk']
        images = Picture.objects.filter(album=pk)
        serializer = ImageSerializer(images, many=True)
        for image in images:
            # image = ImageSerializer(i, context={"request": request})
            image_object = {
                'image': str(image),
                'id': image.id
            }
            images_list.append(image_object)

        #return Response(images_list, content_type="application/json")
        return JsonResponse({'images':images_list})

















