# Generated by Django 3.2.8 on 2022-11-03 18:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20221103_1241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 3, 12, 46, 3, 262945)),
        ),
        migrations.AlterField(
            model_name='event',
            name='start',
            field=models.DateTimeField(default=datetime.datetime(2022, 11, 3, 12, 46, 3, 262945)),
        ),
    ]