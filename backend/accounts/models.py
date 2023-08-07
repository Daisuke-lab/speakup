from django.db import models
from django.contrib.auth import get_user_model
from django.core.files.storage import get_storage_class
# User = get_user_model()
# Create your models here.




    
class User(models.Model):
    id = models.CharField(max_length=200,primary_key=True)
    name = models.CharField(max_length=200,null=True)
    mc_id = models.IntegerField(null=True)
    email = models.CharField(max_length=200, unique=True,null=True)
    emailVerified = models.DateTimeField(null=True)
    image = models.CharField(max_length=1000, null=True)
    class Meta:
        db_table = 'User'
 
class Account(models.Model):
    id = models.CharField(max_length=200,primary_key=True)
    user = models.ForeignKey(User, db_column='userId', on_delete=models.CASCADE)
    type = models.CharField(max_length=200)
    provider = models.CharField(max_length=200)
    providerAccountId = models.CharField(max_length=200)
    refresh_token = models.TextField(max_length=1000, null=True)
    access_token = models.TextField(max_length=1000, null=True)
    expires_at = models.IntegerField(null=True)
    token_type = models.CharField(max_length=200, null=True)
    scope = models.CharField(max_length=200, null=True)
    id_token = models.TextField(max_length=1000, null=True)
    session_state = models.CharField(max_length=200, null=True)
    oauth_token_secret = models.CharField(max_length=200, null=True)
    oauth_token = models.CharField(max_length=200, null=True)
 
    class Meta:
        unique_together = [['provider', 'providerAccountId']]
        db_table = 'Account'
 
 
 
class Session(models.Model):
    id = models.CharField(max_length=200,primary_key=True)
    sessionToken = models.CharField(max_length=200, unique=True)
    user = models.ForeignKey(User, db_column='userId', on_delete=models.CASCADE)
    expires = models.DateTimeField()
 
    class Meta:
        db_table = 'Session'
 
 
class VerificationToken(models.Model):
    identifier = models.CharField(max_length=200)
    token = models.CharField(max_length=200, unique=True)
    expires = models.DateTimeField()
 
    class Meta:
        unique_together = [['identifier', 'token']]
        db_table = 'VerificationToken'


class Language(models.Model):
    code = models.CharField(max_length=200)
    label = models.CharField(max_length=200)
    
class Nationality(models.Model):
    code = models.CharField(max_length=200)
    label = models.CharField(max_length=200)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, null=True)
    age = models.IntegerField(blank=True, null=True, max_length=3)
    native_language = models.ForeignKey(Language, null=True, on_delete=models.SET_NULL, related_name="native_language")
    foreign_language = models.ForeignKey(Language, null=True, on_delete=models.SET_NULL, related_name="foreign_language")
    nationality = models.ForeignKey(Nationality, null=True, on_delete=models.SET_NULL)
    intro = models.TextField(blank=True, null=True)





class Image(models.Model):
    #upload_to='images/'
    image = models.ImageField()
    x = models.FloatField(null=True)
    y = models.FloatField(null=True)
    width = models.FloatField(null=True)
    height = models.FloatField(null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)



class Availability(models.Model):
    class DayOfWeek(models.IntegerChoices):
        MONDAY = 1
        THUESDAY = 2
        WEDNESDAY = 3
        THURSDAY = 4
        FRIDAY = 5
        SATURDAY = 6
        SUNDAY = 7
    day_of_week = models.IntegerField(choices=DayOfWeek.choices)
    start_time = models.TimeField()
    end_time = models.TimeField()
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)



    def __str__(self):
        return self.name