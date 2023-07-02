from rest_framework import serializers

from chats.models import Chat, File, Message


class FileSerializers(serializers.ModelSerializer):
    # def to_internal_value(self, value):
    #     return value

    class Meta:
        model = File
        fields = '__all__'


class MessageSerializers(serializers.ModelSerializer):
    # def to_internal_value(self, value):
    #     return value

    class Meta:
        model = Message
        fields = '__all__'


class ChatSerializers(serializers.ModelSerializer):
    # participants = ContactSerializers
    class Meta:
        model = Chat
        fields = ('id', 'messages', 'participants')
