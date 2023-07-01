# Generated by Django 4.2.2 on 2023-07-01 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Swipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.ManyToManyField(blank=True, related_name='liked', to='accounts.user')),
                ('swiped', models.ManyToManyField(blank=True, related_name='swiped', to='accounts.user')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='swipe', to='accounts.user')),
            ],
        ),
    ]
