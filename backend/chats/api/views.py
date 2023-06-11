from rest_framework import permissions
import json
from rest_framework.generics import *
from chats.models import Chat, Contact, File, Message
from .serializers import ChatSerializers, ContactSerializers, FileSerializers, MessageSerializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from django.core.files.storage import get_storage_class
import boto3
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile, UploadedFile
from PIL import Image
from pathlib import Path
import botocore
import sys
import re
sys.path.append('../')
from Profile.models import Profile , Picture




User = get_user_model()
def get_user_contact(name):
    user = get_object_or_404(User, name=name)
    conatct = get_object_or_404(Contact, user=user)
    return conatct


@api_view(['POST'])
def create_chat(request):
    user1 = get_object_or_404(User, id=request.data['participants'][0])
    user2 = get_object_or_404(User, id=request.data['participants'][1])

    contact1 = get_object_or_404(Contact, user=user1)
    contact2 = get_object_or_404(Contact, user=user2)
    chat = Chat()
    chat.save()
    chat.participants.add(contact1)
    chat.participants.add(contact2)

    serializer = ChatSerializers(data=chat)
    if serializer.is_valid():
        serializer.save()
    print(serializer.data)

    return Response(serializer.data)

@api_view(['GET'])
def get_chats(request, pk):
    if pk:
        user = get_object_or_404(User, id=pk)
        contact = get_object_or_404(Contact, user=user)
        chatid_list = []
        for chat in contact.chats.values():
            chatid_list.append(chat['id'])
            print('chat::',chat)
        chats_list = []
        print(chatid_list)
        for chat_id in chatid_list:
            chat = get_object_or_404(Chat, id=chat_id)
            if len(chat.messages.order_by('-timestamp').all()) > 0:
                last_message = chat.messages.order_by('-timestamp').all()[0].content
                last_timestamp = chat.messages.order_by('-timestamp').all()[0].timestamp
            else:
                last_message = "Let's start chatting!"
                last_timestamp = 'Start now'
            #chat.participants.all().values() is you and friend
            for user in chat.participants.all().values():
                friend_id = user['user_id']
                if friend_id != pk:
                    profile = get_object_or_404(Profile, user=friend_id)
                    images = Picture.objects.filter(album=profile)
                    image = ""
                    if len(images) > 0:
                        image = str(images[0])

                    friend_object = {
                        'Chat_ID': chat_id,
                        'image': image,
                        'profile_id': profile.id,
                        'name': profile.name,
                        'when_matched': chat.timestamp,
                        'last_message':last_message,
                        'last_timestamp': last_timestamp

                    }
                    chats_list.append(friend_object)

        print(chats_list)
        return JsonResponse({'chats_list':chats_list})
        


class ChatListView(ListAPIView):
    serializer_class = ChatSerializers
    permission_classes = [permissions.AllowAny]


    def get_queryset(self):
        queryset = Chat.objects.all()
        name = self.request.query_params.get('name')
        if name:
            contact = get_user_contact(name)
            #chats is related name

            queryset = contact.chats.all()

        return queryset


class MessageCreateView(CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializers
    permission_classes = [permissions.AllowAny]

class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializers
    permission_classes = [permissions.AllowAny]

class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializers
    permission_classes = [permissions.IsAuthenticated]


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializers
    permission_classes = [permissions.AllowAny]


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializers
    permission_classes = [permissions.IsAuthenticated]


# update create, destroy permissons.IsAuthenticated


class ContactListView(ListAPIView):
    serializer_class = ContactSerializers
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):
        queryset = Contact.objects.all()
        name = self.request.query_params.get('name')
        print('name::', name)
        if name:
            contact = get_user_contact(name)
            #chats is related name
            print('contact::', contact.chats)

            queryset = contact.chats.all()

        return queryset




class ContactDetailView(RetrieveAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializers
    permission_classes = [permissions.AllowAny]

class ContactUpdateView(UpdateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializers
    permission_classes = [permissions.IsAuthenticated]


class ContactCreateView(CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializers
    permission_classes = [permissions.AllowAny]


class ContactDeleteView(DestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializers
    permission_classes = [permissions.IsAuthenticated]


class FileListCreateView(ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializers
    permission_classes = [permissions.AllowAny]

class FileRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializers
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        queryset = File.objects.all()
        downloading_file = get_object_or_404(File, pk=self.kwargs['pk'])






@api_view(['GET'])
def get_contact(request, pk):
    if pk:
        user = get_object_or_404(User, pk=pk)
        contact = get_object_or_404(Contact, user=user)
        serializer = ContactSerializers(contact)

        return Response(serializer.data)

@api_view(['PUT'])
def add_friend(request, pk):
    if id:
        user = get_object_or_404(User, id=pk)
        contact = get_object_or_404(Contact, user=user)
        print(request.data)
        friend = get_object_or_404(User, id=request.data['friend'])
        friend_contact = get_object_or_404(Contact, user=friend)
        print(friend_contact)
        contact.friends.add(friend_contact)

        serializer = ContactSerializers(data=contact)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    

def download(request, pk):
    BUCKET_NAME = 'my-bucket' # replace with your bucket name
    KEY = 'my_image_in_s3.jpg' # replace with your object key
    downloading_file = get_object_or_404(File, pk=pk)

    s3 = boto3.resource('s3')

    try:
        print(settings.AWS_STORAGE_BUCKET_NAME)
        downloads_path = str(Path.home() / "Downloads")
        file_path = r"C:\Users\{0}\Downloads\{1}".format('', '')
        print(downloads_path + '\\' + str(downloading_file))
        s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME).download_file(str(downloading_file), downloads_path + '\\' + str(downloading_file))
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            print("The object does not exist.")
        else:
            raise
    return HttpResponse('downloaded successfully')
    
