from rest_framework import serializers
from .models import User, Card, Folder, Bookmark, RefreshToken

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'

class FolderSerializer(serializers.ModelSerializer):
    bookmarks = serializers.PrimaryKeyRelatedField(many=True, queryset=Bookmark.objects.all(), source='bookmark_set')

    class Meta:
        model = Folder
        fields = ['id', 'folder_name', 'user', 'card', 'created_at', 'bookmarks']

class CardSerializer(serializers.ModelSerializer):
    bookmarks = serializers.PrimaryKeyRelatedField(many=True, queryset=Bookmark.objects.all(), source='bookmark_set')
    folders = serializers.PrimaryKeyRelatedField(many=True, queryset=Folder.objects.all(), source='folder_set')

    class Meta:
        model = Card
        fields = ['id', 'card_name', 'user', 'created_at', 'bookmarks', 'folders']

class UserSerializer(serializers.ModelSerializer):
    bookmarks = serializers.PrimaryKeyRelatedField(many=True, queryset=Bookmark.objects.all(), source='bookmark_set')
    cards = serializers.PrimaryKeyRelatedField(many=True, queryset=Card.objects.all(), source='card_set')
    folders = serializers.PrimaryKeyRelatedField(many=True, queryset=Folder.objects.all(), source='folder_set')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_staff', 'is_active', 'created_at', 'bookmarks', 'cards', 'folders']

class RefreshTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefreshToken
        fields = '__all__'
