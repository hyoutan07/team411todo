# Generated by Django 4.1.1 on 2022-09-29 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0005_task_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='importance',
            field=models.CharField(default='Must', max_length=10),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='', max_length=128),
        ),
    ]
