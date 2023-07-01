from rest_framework import serializers
from .models import Swipe 
class SwipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swipe
        fields = '__all__'