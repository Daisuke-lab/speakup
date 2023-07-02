# Generated by Django 4.2.2 on 2023-07-02 09:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_language_remove_profile_foreign_lan_and_more'),
        ('chats', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='timestamp',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='file',
            old_name='chat_file',
            new_name='content',
        ),
        migrations.RenameField(
            model_name='file',
            old_name='timestamp',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='message',
            old_name='timestamp',
            new_name='created_at',
        ),
        migrations.AddField(
            model_name='file',
            name='sent_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.user'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='message',
            name='sent_by',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='chat',
            name='participants',
            field=models.ManyToManyField(to='accounts.user'),
        ),
        migrations.DeleteModel(
            name='Contact',
        ),
    ]
