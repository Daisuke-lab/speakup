from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.mixins import RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import SwipeSerializer
from .models import Swipe
from rest_framework.views import APIView
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
User = get_user_model()

@api_view(['GET'])
def get_swipe(request, pk):
    if pk:
        user = get_object_or_404(User, pk=pk)
        swipe = get_object_or_404(Swipe, user=user)
        serializer = SwipeSerializer(swipe)

        return Response(serializer.data)

@api_view(['PUT'])
def update_swipe(request, pk):
    if pk:
        swipe = get_object_or_404(Swipe, pk=pk)
        #request data is dict, so you can't do request.data.swiped
        print('requset.data::', request.data['swiped'])
        print('swipe::', swipe)
        swipe.swiped.add(request.data['swiped'])
        try:
            swipe.liked.add(request.data['liked'])
            print('Swipe right')

        except:
            print('Swipe left')

        serializer = SwipeSerializer(data=swipe)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
        #swipe.swiped.add()


class SwipeView(GenericAPIView, RetrieveModelMixin,
CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    queryset = Swipe.objects.all()
    serializer_class = SwipeSerializer
    #lookup_field = 'account_id'

    def post(self, request):
        return  self.create(request)
        
    def get(self, request, pk=None):
        if pk:
            return self.retrieve(request, pk)
        else:
            return self.list(request)


    def delete(self, request, pk=None):
        return self.destroy(request, pk)