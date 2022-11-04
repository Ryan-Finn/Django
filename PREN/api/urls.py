from rest_framework import routers

from .api import BoardInfoViewSet

router = routers.DefaultRouter()
router.register("api/boardinfo", BoardInfoViewSet, "boardinfo")

urlpatterns = router.urls
