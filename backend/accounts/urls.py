
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
    path('/profiles', ProfileListCreateView.as_view()),
    path('/profiles/<int:id?',ProfileRetrieveUpdateDestroyView.as_view()),
    path('/images', ProfileListCreateView.as_view()),
    path('/images/<int:id?',ProfileRetrieveUpdateDestroyView.as_view()),
    path('/nationalities', NationalityListCreateView.as_view()),
    path('/languages', LanguageListCreateView.as_view()),
    # url(r'^test/$', ProfileList.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)