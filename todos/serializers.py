from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Todo
        fields = ('id', 'text', 'complete', 'owner', 'created_at',)


class UserSerializer(serializers.ModelSerializer):
    todos = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'todos',)
