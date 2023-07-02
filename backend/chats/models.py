from django.db import models
from django.contrib.auth import get_user_model

from accounts.models import User
# Create your models here.




#This is for fetching messages
class Chat(models.Model):
    participants = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)


    def last_30_messages(self):
        return self.messages.order_by('-timestamp').all()[:30]


    def __str__(self):
        return "{}".format(self.pk)
        

#This is for new Messages
class Message(models.Model):
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE)



class File(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    content = models.FileField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    sent_by = models.ForeignKey(User, on_delete=models.CASCADE)

