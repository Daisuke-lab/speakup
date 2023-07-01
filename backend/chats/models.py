from django.db import models
from django.contrib.auth import get_user_model

from accounts.models import User
# Create your models here.


#This is for making friends
class Contact(models.Model):
    #defining friends as 'self' allows you to add user to friend when either user1 or user2 add friend
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True, related_name='friends')


    def __str__(self):
        return self.user.name

#This is for fetching messages
class Chat(models.Model):
    participants = models.ManyToManyField(Contact, related_name='chats')
    timestamp = models.DateTimeField(auto_now_add=True)


    def last_30_messages(self):
        return self.messages.order_by('-timestamp').all()[:30]


    def __str__(self):
        return "{}".format(self.pk)
        

#This is for new Messages
class Message(models.Model):
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.name

class File(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    chat_file = models.FileField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}'.format(self.chat_file)