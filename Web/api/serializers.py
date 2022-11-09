from rest_framework import serializers

from .models import BoardInfo


class BoardInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardInfo
        fields = "__all__"
