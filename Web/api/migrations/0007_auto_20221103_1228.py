# Generated by Django 3.2.8 on 2022-11-03 18:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20221103_1214'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='end',
        ),
        migrations.RemoveField(
            model_name='event',
            name='start',
        ),
    ]