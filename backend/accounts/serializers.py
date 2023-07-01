from rest_framework import serializers
from .models import Profile, Image
from django.db.models import F, Value
from PIL import Image
import io
import sys
from django.core.files.storage import get_storage_class
from django.core.files.uploadedfile import InMemoryUploadedFile, UploadedFile


class ProfileSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = ['id','user', 'name', 'age', 'gender', 'native_lan', 'foreign_lan', 'location', 'time_start', 'time_end',
        'intro', 'freeday', 'images']

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
        image.save(output, format='JPEG',)
        serialzed_image = InMemoryUploadedFile(output, 'ImageField', str(image_file),'image/jpeg',sys.getsizeof(output), None)
        

        data = {'image':serialzed_image, 'album':album, 'x':x, 'y':y, 'width':width, 'height':height}
        # return image

        return Image.objects.create(**data)

    # def get_absolute_url(self, picture):
    #     print('ABSOLUTE')
    #     request = self.context.get('request')
    #     photo_url = picture.image.url
    #     print(photo_url)
    #     return picture

