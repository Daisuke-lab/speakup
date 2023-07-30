from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from .view import ping
from django.views.generic.base import RedirectView
# , namespace='chat'

prefix = f"api/{settings.API_VERSION}"
urlpatterns = [
    path('admin/', admin.site.urls),
    path('favicon.ico', RedirectView.as_view(url=settings.STATIC_URL + 'favicon.ico')),
    path(f'{prefix}/ping/<int:id>', ping),
    path(f'{prefix}/chats', include('chats.urls')),
    path(f'{prefix}/accounts', include('accounts.urls')),
    path(f'{prefix}/swipes', include('swipes.urls')),
] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

#django.contrib.auth.urls

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]