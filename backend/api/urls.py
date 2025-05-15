from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CardViewSet, FolderViewSet, BookmarkViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cards', CardViewSet)
router.register(r'folders', FolderViewSet)
router.register(r'bookmarks', BookmarkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
