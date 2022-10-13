# Create your views here.
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated

from .models import User, Task, Progress_Master
from .serializers import ProgressMasterSerializer, TaskSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)


class ProgressMasterViewSet(viewsets.ModelViewSet):
    queryset = Progress_Master.objects.all()
    serializer_class = ProgressMasterSerializer
    permission_classes = (AllowAny,)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        current_user = self.request.user
        return Task.objects.filter(user_id=current_user.id)


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)
