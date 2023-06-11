from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('User must have an eamil address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)

        user.set_password(password)
        user.save()

        return user #'NoneType' object has no attribute 'is_active'

    def create_superuser(self, email, name, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have true value of is_staff')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have true value of is_superuser')

        return self.create_user(email, name, password, **extra_fields)




class UserAccount(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    objects = UserAccountManager()


    #USERNAME_FIELD is what you use to login. I know. the name is suck. It should be LOGIN_FIELD
    # In default, USERNAME_FIELD is name, but you don'T want to login using name. do you?
    USERNAME_FIELD = 'email'
    #REQUIRED_FIELDS is essntial text besides USENAME_FIELD and password
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email
