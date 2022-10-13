from django.contrib import admin

# Register your models here.
# from アプリケーション名.models import マイグレーションのクラス名
from todoapp.models import Progress_Master, Task
admin.site.register(Progress_Master)
admin.site.register(Task)
