from django.contrib import admin

# Register your models here.
from .models import Message, Chat, Contact, File
admin.site.register(Message)
admin.site.register(Chat)
admin.site.register(Contact)
admin.site.register(File)