from django.db import models

from accounts.models import User


class Match(models.Model):
    swipe = models.ForeignKey("Swipe", null=True, on_delete=models.CASCADE, related_name="user1")
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="user2")
    created_at = models.DateTimeField(auto_now_add=True)


# Create your models here.
class Swipe(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE, related_name='swipe')
    swiped = models.ManyToManyField(User, blank=True, related_name='swiped')
    liked = models.ManyToManyField(User, blank=True, related_name='liked')
    matched = models.ManyToManyField(User, blank=True, through=Match, related_name="matched")


    def __str__(self):
        return self.user.name
    


    #以下のやり方だとtimestampが取れず、matchした日付が分からない。
    # user = models.OneToOneField(User, null=True, on_delete=models.CASCADE, related_name='swipe')
    # mached_users = models.ManyToManyField(User, blank=True)