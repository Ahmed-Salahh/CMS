# admin.py
from django.contrib import admin
from .models import *

from unfold.admin import ModelAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from django.contrib.auth.models import User, Group

from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm


admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    # Forms loaded from `unfold.forms`
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm


@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass

@admin.register(WorkflowInstance)
class WorkflowInstanceAdmin(ModelAdmin):
    list_display = ('instance_id', 'workflow_name', 'status', 'initiated_by_email', 'current_step_id', 'created_at', 'updated_at')
    search_fields = ('workflow_id', 'workflow_name', 'initiated_by_email', 'initiated_by_clerk_id')
    list_filter = ('status', 'created_at', 'updated_at')
    readonly_fields = ('instance_id', 'created_at', 'updated_at')


@admin.register(StepExecution)
class StepExecutionAdmin(ModelAdmin):
    list_display = ('execution_id', 'workflow_instance', 'step_name', 'status', 'assigned_to_email', 'executed_by_email', 'created_at')
    search_fields = ('step_id', 'step_name', 'assigned_to_email', 'executed_by_email')
    list_filter = ('status', 'created_at', 'completed_at')
    readonly_fields = ('execution_id', 'created_at', 'updated_at')
    raw_id_fields = ('workflow_instance',)

# Register your models here.

# admin.py
from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Roles, Permissions, RolePermissions, Users, UserRoles, EmailSettings, StatusDictionary, Integrations, AuditLog

class RolesAdmin(ModelAdmin):
    list_display = ('RoleID', 'RoleName', 'CreatedAt', 'UpdatedAt')
    search_fields = ('RoleName',)

admin.site.register(Roles, RolesAdmin)

class PermissionsAdmin(ModelAdmin):
    list_display = ('PermissionID', 'PermissionName', 'CreatedAt', 'UpdatedAt')
    search_fields = ('PermissionName',)

admin.site.register(Permissions, PermissionsAdmin)

class RolePermissionsAdmin(ModelAdmin):
    list_display = ('RolePermissionID', 'RoleID', 'PermissionID')
    list_filter = ('RoleID', 'PermissionID')

admin.site.register(RolePermissions, RolePermissionsAdmin)

class UsersAdmin(ModelAdmin):
    list_display = ('UserID', 'Username', 'Email', 'IsActive', 'CreatedAt', 'UpdatedAt')
    search_fields = ('Username', 'Email')

admin.site.register(Users, UsersAdmin)

class UserRolesAdmin(ModelAdmin):
    list_display = ('UserRoleID', 'UserID', 'RoleID')
    list_filter = ('UserID', 'RoleID')

admin.site.register(UserRoles, UserRolesAdmin)

class EmailSettingsAdmin(ModelAdmin):
    list_display = ('EmailSettingID', 'SmtpServer', 'IsEnabled', 'LastChecked')
    search_fields = ('SmtpServer',)

admin.site.register(EmailSettings, EmailSettingsAdmin)

class StatusDictionaryAdmin(ModelAdmin):
    list_display = ('StatusID', 'StatusCode', 'StatusName', 'StageClassification', 'CreatedAt', 'UpdatedAt')
    search_fields = ('StatusCode', 'StatusName')

admin.site.register(StatusDictionary, StatusDictionaryAdmin)

class IntegrationsAdmin(ModelAdmin):
    list_display = ('IntegrationID', 'IntegrationName', 'IsEnabled', 'CreatedAt', 'UpdatedAt')
    search_fields = ('IntegrationName',)

admin.site.register(Integrations, IntegrationsAdmin)

class AuditLogAdmin(ModelAdmin):
    list_display = ('AuditLogID', 'Action', 'UserID', 'Timestamp')
    list_filter = ('UserID',)
    search_fields = ('Action',)

admin.site.register(AuditLog, AuditLogAdmin)

admin.site.site_header = "My Admin Site"
admin.site.site_title = "Admin Site Title"