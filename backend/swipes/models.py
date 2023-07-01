from django.db import models

from accounts.models import User

# Create your models here.
class Swipe(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE, related_name='swipe')
    swiped = models.ManyToManyField(User, blank=True, related_name='swiped')
    liked = models.ManyToManyField(User, blank=True, related_name='liked')


    def __str__(self):
        return self.user.name