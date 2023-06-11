from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chats.routing
#this is kind of "urls.py". it is connected to chat.routing as you can see

# the ProtocolTypeRouter will first inspect the type of connection
#The AuthMiddlewareStack will populate the connection’s scope with a reference to the currently authenticated user
#The URLRouter will examine the HTTP path of the connection to route it to a particular consumer, based on the provided url patterns.

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chats.routing.websocket_urlpatterns
        )
    ),
})


