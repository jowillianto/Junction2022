from rest_framework import serializers
from .models import NGO

class NGOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGO
        fields = ['id', 'name', 'description', 'avatar', 'staff']