# Generated by Django 4.1.3 on 2022-11-09 19:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_event_end_alter_event_start'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 9, 12, 46, 35, 79437)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 9, 12, 46, 35, 79437)),
        ),
    ]