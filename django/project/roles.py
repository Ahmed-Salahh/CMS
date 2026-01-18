import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from app.models import *

# Dictionary holding roles and permissions

roles = {
    'Applicant': {
        'permissions': {
            Users: ['view'],
            UserRoles: ['view'],
            AuditLog: ['view']
        }
    },
    'OrganizationUser': {
        'permissions': {
            Users: ['view'],
            UserRoles: ['view'],
            AuditLog: ['view']
        }
    },
    'AdmissionsAdmin': {
        'permissions': {
            Users: ['add', 'change', 'delete', 'view'],
            UserRoles: ['view'],
            Roles: ['view'],
            Permissions: ['view'],
            RolePermissions: ['view'],
            StatusDictionary: ['add', 'change', 'delete', 'view'],
            EmailSettings: ['add', 'change', 'delete', 'view'],
            Integrations: ['add', 'change', 'delete', 'view'],
            AuditLog: ['view']
        }
    },
    'TrainingAdmin': {
        'permissions': {
            Users: ['add', 'change', 'delete', 'view'],
            UserRoles: ['view'],
            Roles: ['view'],
            Permissions: ['view'],
            RolePermissions: ['view'],
            StatusDictionary: ['add', 'change', 'delete', 'view'],
            EmailSettings: ['view'],
            Integrations: ['view'],
            AuditLog: ['view']
        }
    },
    'SystemAdmin': {
        'permissions': {
            Users: ['add', 'change', 'delete', 'view'],
            UserRoles: ['add', 'change', 'delete', 'view'],
            Roles: ['add', 'change', 'delete', 'view'],
            Permissions: ['add', 'change', 'delete', 'view'],
            RolePermissions: ['add', 'change', 'delete', 'view'],
            EmailSettings: ['add', 'change', 'delete', 'view'],
            StatusDictionary: ['add', 'change', 'delete', 'view'],
            Integrations: ['add', 'change', 'delete', 'view'],
            AuditLog: ['view']
        }
    }
}


def add_permissions_to_groups():
    for role_name, role_data in roles.items():
        # Get or create the group
        group, created = Group.objects.get_or_create(name=role_name)
        print(f"Group '{role_name}' {'created' if created else 'exists'}.")

        # Clear existing permissions
        group.permissions.clear()

        for model, perms in role_data["permissions"].items():
            # Dynamically get model class
            # model = globals().get(model_name)
            # if not model:
            #     print(f"Model '{model_name}' not found.")
            #     continue

            content_type = ContentType.objects.get_for_model(model)

            for perm in perms:
                try:
                    permission, created = Permission.objects.get_or_create(
                        codename=f"{perm}_{model._meta.model_name}",
                        content_type=content_type,
                        defaults={
                            "name": f"Can {perm} {model._meta.verbose_name}"
                        }
                    )
                    group.permissions.add(permission)
                    print(
                        f"Added '{perm}' permission for '{model._meta.model_name}' to '{role_name}'."
                    )
                except Permission.DoesNotExist:
                    print(
                        f"Permission '{perm}_{model._meta.model_name}' does not exist."
                    )

add_permissions_to_groups()
