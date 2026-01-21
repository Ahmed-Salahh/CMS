from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field # type: ignore
import uuid
import json

# Create your models here.


class WorkflowInstance(models.Model):
    WORKFLOW_STATES = [
        ('started', 'Started'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    instance_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    workflow_id = models.CharField(max_length=255)
    workflow_name = models.CharField(max_length=255)
    current_step_id = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=255, choices=WORKFLOW_STATES, default='started')
    initiated_by_email = models.EmailField(max_length=254)
    initiated_by_clerk_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"WorkflowInstance {self.instance_id} - {self.workflow_name} ({self.status})"


class StepExecution(models.Model):
    STEP_STATES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('skipped', 'Skipped'),
    ]
    
    execution_id = models.AutoField(primary_key=True)
    workflow_instance = models.ForeignKey(WorkflowInstance, on_delete=models.CASCADE, related_name='step_executions')
    step_id = models.CharField(max_length=255)
    step_name = models.CharField(max_length=255)
    status = models.CharField(max_length=255, choices=STEP_STATES, default='pending')
    assigned_to_email = models.EmailField(max_length=254, null=True, blank=True)
    executed_by_email = models.EmailField(max_length=254, null=True, blank=True)
    step_data = models.JSONField(default=dict, help_text="JSON data containing the step form submission")
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['workflow_instance', 'step_id']
    
    def __str__(self):
        return f"StepExecution {self.step_id} for {self.workflow_instance.instance_id} ({self.status})"


# models.py
from django.db import models

class Roles(models.Model):
    RoleID = models.AutoField(primary_key=True)
    RoleName = models.CharField(max_length=255, unique=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Roles'
        verbose_name_plural = 'Roles'


class Permissions(models.Model):
    PermissionID = models.AutoField(primary_key=True)
    PermissionName = models.CharField(max_length=255, unique=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Permissions'
        verbose_name_plural = 'Permissions'


class RolePermissions(models.Model):
    RolePermissionID = models.AutoField(primary_key=True)
    RoleID = models.ForeignKey(Roles, db_column='RoleID', on_delete=models.PROTECT)
    PermissionID = models.ForeignKey(Permissions, db_column='PermissionID', on_delete=models.PROTECT)

    class Meta:
        db_table = 'RolePermissions'
        verbose_name_plural = 'Role Permissions'


class Users(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=255, unique=True)
    PasswordHash = models.CharField(max_length=255)
    Email = models.EmailField(max_length=255, unique=True)
    IsActive = models.BooleanField(default=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Users'
        verbose_name_plural = 'Users'


class UserRoles(models.Model):
    UserRoleID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(Users, db_column='UserID', on_delete=models.PROTECT)
    RoleID = models.ForeignKey(Roles, db_column='RoleID', on_delete=models.PROTECT)

    class Meta:
        db_table = 'UserRoles'
        verbose_name_plural = 'User Roles'


class EmailSettings(models.Model):
    EmailSettingID = models.AutoField(primary_key=True)
    SmtpServer = models.CharField(max_length=255)
    SmtpPort = models.IntegerField()
    Username = models.CharField(max_length=255)
    PasswordHash = models.CharField(max_length=255)
    IsEnabled = models.BooleanField(default=False)
    LastChecked = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'EmailSettings'
        verbose_name_plural = 'Email Settings'


class StatusDictionary(models.Model):
    StatusID = models.AutoField(primary_key=True)
    StatusCode = models.CharField(max_length=50, unique=True)
    StatusName = models.CharField(max_length=255)
    StageClassification = models.CharField(max_length=255)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'StatusDictionary'
        verbose_name_plural = 'Status Dictionary'


class Integrations(models.Model):
    IntegrationID = models.AutoField(primary_key=True)
    IntegrationName = models.CharField(max_length=255)
    ApiKey = models.CharField(max_length=255)
    IsEnabled = models.BooleanField(default=False)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Integrations'
        verbose_name_plural = 'Integrations'


class AuditLog(models.Model):
    AuditLogID = models.AutoField(primary_key=True)
    Action = models.CharField(max_length=255)
    UserID = models.ForeignKey(Users, db_column='UserID', on_delete=models.SET_NULL, null=True)
    Timestamp = models.DateTimeField(auto_now_add=True)
    Metadata = models.JSONField(blank=True, null=True)

    class Meta:
        db_table = 'AuditLog'
        verbose_name_plural = 'Audit Logs'


class SuccessStory(models.Model):
    """Model for success stories from Altamayyuz Academy graduates"""
    
    CATEGORY_CHOICES = [
        ('program', 'Programs'),
        ('career', 'Career Growth'),
        ('achievement', 'Achievements'),
        ('leadership', 'Leadership'),
        ('other', 'Other'),
    ]
    
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, help_text="Story title")
    description = CKEditor5Field('Description', config_name='extends', help_text="Full story content")
    author_name = models.CharField(max_length=100, help_text="Graduate name")
    author_image = models.URLField(max_length=500, blank=True, null=True, help_text="URL to author's photo")
    story_image = models.URLField(max_length=500, help_text="URL to story featured image")
    rating = models.DecimalField(
        max_digits=2, 
        decimal_places=1, 
        default=4.5,
        validators=[MinValueValidator(0.0)],
        help_text="Rating out of 5.0"
    )
    category = models.CharField(
        max_length=50, 
        choices=CATEGORY_CHOICES, 
        default='other',
        help_text="Story category"
    )
    is_featured = models.BooleanField(
        default=False, 
        help_text="Mark as featured story (shown prominently)"
    )
    is_published = models.BooleanField(
        default=True,
        help_text="Publish status"
    )
    view_count = models.IntegerField(default=0, help_text="Number of views")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'success_stories'
        verbose_name = 'Success Story'
        verbose_name_plural = 'Success Stories'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.author_name}"
    
    def clean(self):
        """Validate that rating is between 0 and 5"""
        if self.rating < 0 or self.rating > 5:
            raise ValidationError({'rating': 'Rating must be between 0 and 5.0'})
    
    def increment_view_count(self):
        """Increment view count when story is viewed"""
        self.view_count += 1
        self.save(update_fields=['view_count'])


class Contact(models.Model):
    """Contact form submission model"""
    TYPE_CHOICES = [
        ('complaint', 'Complaint'),
        ('cooperation', 'Cooperation'),
        ('inquiry', 'General Inquiry'),
    ]
    
    id = models.AutoField(primary_key=True)
    type_of_interest = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES,
        default='complaint',
        help_text="Type of contact inquiry"
    )
    name = models.CharField(max_length=255, help_text="Contact person name")
    email = models.EmailField(max_length=254, help_text="Contact email address")
    phone_number = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        help_text="Optional phone number"
    )
    message = models.TextField(help_text="Contact message")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'contacts'
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.type_of_interest} ({self.created_at.strftime('%Y-%m-%d')})"