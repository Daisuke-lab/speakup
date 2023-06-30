
from django.urls import path, include, re_path
from .views import *
from .models import Profile
from .filters import ProfileFilter
from django_filters.views import object_filter
from django_filters.views import FilterView
from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('list/', ProfileList.as_view()),
    path('create/',ProfileListCreateView.as_view()),
    path('update/<int:pk>/', ProfileRetrieveUpdateDestroyView.as_view()),
    path('delete/<int:pk>/', ProfileRetrieveUpdateDestroyView.as_view()),
    path('detail/<pk>/', get_profile),
    path('friend/<pk>/', ProfileRetrieveUpdateDestroyView.as_view()),
    path('image/', ImageListCreate.as_view()),
    path('image/<pk>/', ImageDetail.as_view()),
    # url(r'^test/$', ProfileList.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)