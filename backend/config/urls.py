from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

# , namespace='chat'
urlpatterns = [
    path('chat-api/', include(('chats.api.urls','chats'), namespace='chats')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('profile/', include('profiles.urls')),
    path('swipe/', include('profiles.swipe.urls')),
] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#django.contrib.auth.urls

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]