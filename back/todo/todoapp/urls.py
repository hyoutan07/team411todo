from email.mime import base
from rest_framework import routers
from .views import ProgressMasterViewSet, TaskViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'progress_master', ProgressMasterViewSet)
