from utils.jwt_util import JWTUtil
import django_filters
from .models import Profile
from django_filters import DateFilter
from django_filters import rest_framework as filters


class SwipedFilter(filters.Filter):

    def filter(self, qs, value):
        user = JWTUtil.get_user(self.request)
        if value and user is not None:
            product_ids = Profile.objects.filter(
                **{f'profile__user_id__not_in': user.id}
                )
            return qs.filter(id__in=product_ids)
        return qs
    

class ProfileFilter(filters.FilterSet):
    age = filters.RangeFilter(field_name='age')
    native_lan = filters.CharFilter(field_name='native_lan')
    foreign_lan = filters.CharFilter(field_name='foreign_lan')
    gender = filters.CharFilter(field_name='gender')
    swiped = SwipedFilter(field_name="swiped")
    user_id = filters.CharFilter(field_name="user_id")
    class Meta:
        model = Profile
        fields = ['age', 'native_lan', 'foreign_lan', 'gender', "user_id"]

        # fields = {
        #     'native_lan': ['exact', 'contains'],
        #     'foreign_lan': ['exact', 'contains'],
        #     'gender': ['exact'],
        #     'age':['gt', 'lte']
        # }