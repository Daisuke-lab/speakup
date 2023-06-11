
from django.shortcuts import render, get_object_or_404
from .models import *

def get_last_30_messages(ChatID):
    chat = get_object_or_404(Chat, id=ChatID)
    return chat.messages.order_by('-timestamp').all()[:30]

def get_last_30_files(ChatID):
    chat = get_object_or_404(Chat, id=ChatID)
    return chat.files.order_by('-timestamp').all()[:30]


def get_user_contact(name):
    user = get_object_or_404(User, name=name)
    return get_object_or_404(Contact, user=user)