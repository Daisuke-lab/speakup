# Generated by Django 3.1.1 on 2020-11-14 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20201114_1636'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='admin',
            field=models.BooleanField(default=False),
        ),
    ]
