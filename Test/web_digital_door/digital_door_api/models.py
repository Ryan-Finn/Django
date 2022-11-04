from django.db import models


# Create your models here.
class BoardInfo(models.Model):
    # Base Information
    room_name = models.CharField(max_length=30, default="Room Name")
    added_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=24, default="basic")

    # info needed for setup
    resolution = models.CharField(max_length=12, default="1200x825")
    isSetup = models.BooleanField(default=False)
    refresh_rate = models.IntegerField(default=60)

    # storage messages
    s_message = models.CharField(max_length=500, blank=True)
    d_message = models.CharField(max_length=1000, blank=True)
    w_message = models.CharField(max_length=2000, blank=True)
    message = models.CharField(max_length=2000, blank=True)

    # needs Info from board
    connection = models.BooleanField(default=False)
    battery_status = models.CharField(max_length=5, default="100%")


class Company(models.Model):
    name = models.TextField()
    compId = models.TextField()
