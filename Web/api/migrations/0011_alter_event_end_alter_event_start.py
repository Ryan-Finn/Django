# Generated by Django 4.1.1 on 2022-11-05 22:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20221105_1200'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 5, 16, 49, 48, 630019)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 5, 16, 49, 48, 630019)),
        ),
    ]
