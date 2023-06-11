import django_filters
from .models import Profile
from django_filters import DateFilter
from django_filters import rest_framework as filters

class ProfileFilter(filters.FilterSet):
    age = filters.RangeFilter(field_name='age')
    native_lan = filters.CharFilter(field_name='native_lan')
    foreign_lan = filters.CharFilter(field_name='foreign_lan')
    gender = filters.CharFilter(field_name='gender')
    class Meta:
        model = Profile
        fields = ['age', 'native_lan', 'foreign_lan', 'gender']

        # fields = {
        #     'native_lan': ['exact', 'contains'],
        #     'foreign_lan': ['exact', 'contains'],
        #     'gender': ['exact'],
        #     'age':['gt', 'lte']
        # }