from django.urls import path, re_path

from .views import *


app_name='chat'


urlpatterns = [
    path('chat/', ChatListView.as_view()),
    path('chat/<int:pk>/', get_chats),
    path('chat/create/', create_chat),
    path('chat/detail/<pk>/', ChatDetailView.as_view()),
    path('chat/update/<pk>/', ChatUpdateView.as_view()),
    path('chat/delete/<pk>/', ChatDeleteView.as_view()),
    path('message/create/', MessageCreateView.as_view()),
    path('file/', FileListCreateView.as_view()),
    path('file/create/', FileListCreateView.as_view()),
    path('file/detail/<pk>/', FileRetrieveUpdateDestroyView.as_view()),
    path('file/update/<pk>/', FileRetrieveUpdateDestroyView.as_view()),
    path('file/delete/<pk>/', FileRetrieveUpdateDestroyView.as_view()),
    path('file/download/<pk>/', download),
]