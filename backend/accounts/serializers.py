from rest_framework import serializers
from .models import Profile, Image
from django.db.models import F, Value
import io
import sys
from django.core.files.storage import get_storage_class
from django.core.files.uploadedfile import InMemoryUploadedFile, UploadedFile


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"

    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.domain)
        instance.age = validated_data.get("age", instance.age)
        instance.native_language = validated_data.get("native_language", instance.native_language)
        instance.foreign_language = validated_data.get("foreign_language", instance.foreign_language)
        instance.nationality = validated_data.get("nationality", instance.nationality)
        instance.intro = validated_data.get("intro", instance.intro)

        return instance
        

class ImageSerializer(serializers.ModelSerializer):
    #absolute_url = serializers.SerializerMethodField()
    class Meta:
        model = Image
        fields = '__all__'

    def create(self, validated_data):
        image_file = validated_data.get('image')
        image = Image.open(image_file)
        x = validated_data.get('x')
        y = validated_data.get('y')
        width = validated_data.get('width')
        height = validated_data.get('height')
        album = validated_data.get('album')
        image = image.crop((x, y, x+width, y+height))
        output = io.BytesIO()
        image.save(output, format='JPEG')
        serialzed_image = InMemoryUploadedFile(output, 'ImageField', str(image_file),'image/jpeg',sys.getsizeof(output), None)
        

        data = {'image':serialzed_image, 'album':album, 'x':x, 'y':y, 'width':width, 'height':height}
        # return image

        return Image.objects.create(**data)


