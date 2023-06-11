
from django.urls import path, include, re_path
from .views import SwipeView, get_swipe, update_swipe
urlpatterns = [
    path('list/', SwipeView.as_view()),
    path('create/', SwipeView.as_view()),
    path('update/<pk>/', update_swipe),
    path('detail/<pk>/', get_swipe),
    path('delete/<pk>/', SwipeView.as_view()),
]