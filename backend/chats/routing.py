from django.urls import re_path, path

from . import consumers



websocket_urlpatterns = [
    re_path(r'^ws/chat/(?P<room_name>[^/]+)/$', consumers.ChatConsumer.as_asgi()),
]

# websocket_urlpatterns = [
#     #"/$" implys you have to end path with "/"
#     #"\w" implys any number

# #ws => wss
#     re_path(r'^wss/chat/(?P<room_name>[^/]+)/$', consumers.ChatConsumer),
# ]