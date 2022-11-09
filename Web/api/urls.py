from rest_framework import routers
from django.urls import path
from .api import BoardInfoViewSet
from . import views

router = routers.DefaultRouter()
router.register("api/boardinfo", BoardInfoViewSet, "boardinfo")

urlpatterns = [
    path('view/allEvent/<str:startDate>/<str:endDate>/', views.Event_Get, name='view/allEvent/'),
    path('view/updateEvent/<str:id>/<str:newTitle>/', views.Event_Update, name='view/allEvent/'),
    path('view/deleteEvent/<str:id>/', views.Event_Delete, name='view/allEvent/'),
    path('view/createEvent/<str:newTitle>/<str:startDate>/<str:endDate>/', views.Event_Create, name='view/allEvent/'),
]

urlpatterns += router.urls
