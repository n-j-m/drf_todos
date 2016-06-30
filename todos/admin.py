from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from todos.models import Role, Todo


class RoleInline(admin.StackedInline):
    model = Role
    can_delete = False
    verbose_name_plural = 'role'

class UserAdmin(BaseUserAdmin):
    inlines = (RoleInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff',)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Todo)
