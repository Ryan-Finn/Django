from rest_framework import viewsets, permissions

from .models import BoardInfo
from .serializers import BoardInfoSerializer


# Board Info Viewset
class BoardInfoViewSet(viewsets.ModelViewSet):
    queryset = BoardInfo.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = BoardInfoSerializer
