from django.db import models
from datetime import datetime


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
    compId = models.TextField(primary_key=True, default='c-1')


class Admin(models.Model):
    # control_list =
    # role =
    user_id = models.TextField(primary_key=True, default='u-1')
    user = models.TextField()
    passW = models.TextField()
    comp_id = models.ForeignKey('Company', on_delete=models.CASCADE)


class Room(models.Model):
    room_id = models.TextField(primary_key=True)
    room_num = models.IntegerField()
    room_name = models.IntegerField()
    location = models.TextField()
    description = models.CharField(max_length=1000, blank=True)


class Event(models.Model):
    event_id = models.TextField(primary_key=True)
    title = models.TextField()
    desc = models.TextField()
    start = models.DateTimeField(default=datetime.now())
    end = models.DateTimeField(default=datetime.now())


class RoomAttributes(models.Model):
    occupancy = models.IntegerField()
    zoom_info = models.TextField()
    availability = models.BooleanField()
    req_approval = models.BooleanField(default=False)
    room_id = models.ForeignKey('Room', on_delete=models.CASCADE)
