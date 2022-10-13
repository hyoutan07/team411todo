from rest_framework import serializers
from rest_framework.response import Response
from .models import Task, Progress_Master
from rest_framework import status
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ('username', 'password')
        exclude = ('email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.id = validated_data.get('id', instance.user_id)
    #     instance.username = validated_data.get(
    #         'name', instance.username)
    #     instance.save()
    #     return instance


class ProgressMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress_Master
        fields = ('progress_id', 'name')
        exclude = ()


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['task_id']

    def create(self, validated_data):
        task = Task(**validated_data)

        if validated_data["user_id"] != self.context['request'].user:
            task.detail = "failed to create"
            return task

        task.save()
        task.task_id = Task.objects.latest("task_id").task_id
        return task

    # タスクの削除処理を行う
    def delete(self, validated_data):
        if validated_data["user_id"] != self.context['request'].user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        task = self.get_object(validated_data["task_id"])
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # タスクの更新処理を行
    def update(self, instance, validated_data):
        if validated_data["user_id"] != self.context['request'].user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        instance.title = validated_data.get('title', instance.title)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.progress_id = validated_data.get(
            'progress_id', instance.progress_id)
        instance.date = validated_data.get('date', instance.date)
        instance.detail = validated_data.get('detail', instance.detail)
        instance.importance = validated_data.get(
            'importance', instance.importance)
        instance.save()
        return instance
