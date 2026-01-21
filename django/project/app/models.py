from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field # type: ignore
import uuid
import json
from django.utils import timezone

# Create your models here.


class FAQCategory(models.Model):
    """Model for FAQ categories/sections"""
    CategoryID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Slug = models.SlugField(max_length=255, unique=True)
    Description = models.TextField(blank=True, null=True)
    Icon = models.CharField(max_length=100, blank=True, null=True, help_text="Icon name or class")
    Order = models.IntegerField(default=0, help_text="Display order")
    IsActive = models.BooleanField(default=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'FAQCategories'
        verbose_name_plural = 'FAQ Categories'
        ordering = ['Order', 'Name']
    
    def __str__(self):
        return self.Name


class FAQ(models.Model):
    """Model for individual FAQ items"""
    FAQID = models.AutoField(primary_key=True)
    Category = models.ForeignKey(
        FAQCategory, 
        on_delete=models.CASCADE, 
        related_name='faqs',
        db_column='CategoryID'
    )
    Question = models.CharField(max_length=500)
    Answer = models.TextField()
    Order = models.IntegerField(default=0, help_text="Display order within category")
    IsActive = models.BooleanField(default=True)
    HelpfulCount = models.IntegerField(default=0)
    NotHelpfulCount = models.IntegerField(default=0)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'FAQs'
        verbose_name_plural = 'FAQs'
        ordering = ['Order', 'Question']
    
    def __str__(self):
        return f"{self.Question[:50]}..."


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


class Program(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('upcoming', 'Upcoming'),
        ('closed', 'Closed'),
    ]
    
    LANGUAGE_CHOICES = [
        ('English', 'English'),
        ('Arabic', 'Arabic'),
        ('Bilingual', 'Bilingual'),
    ]
    
    LOCATION_CHOICES = [
        ('On-site (Riyadh)', 'On-site (Riyadh)'),
        ('On-site (Jeddah)', 'On-site (Jeddah)'),
        ('On-site (Dammam)', 'On-site (Dammam)'),
        ('Online', 'Online'),
        ('Hybrid', 'Hybrid'),
    ]
    
    ProgramID = models.AutoField(primary_key=True)
    ProgramName = models.CharField(max_length=255)
    ProgramDescription = models.TextField()
    ProgramImage = models.URLField(max_length=500, blank=True, null=True)
    Duration = models.CharField(max_length=100, help_text="e.g., 3 Months, 6 Weeks")
    Language = models.CharField(max_length=50, choices=LANGUAGE_CHOICES, default='English')
    Location = models.CharField(max_length=100, choices=LOCATION_CHOICES, default='On-site (Riyadh)')
    TargetAudience = models.CharField(max_length=100, help_text="e.g., Fresh Graduates, Professionals")
    Status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    
    # Optional fields
    Requirements = models.TextField(blank=True, null=True, help_text="Program requirements")
    Benefits = models.TextField(blank=True, null=True, help_text="Program benefits")
    Curriculum = models.TextField(blank=True, null=True, help_text="Program curriculum")
    
    # Date fields
    StartDate = models.DateField(blank=True, null=True)
    EndDate = models.DateField(blank=True, null=True)
    ApplicationDeadline = models.DateTimeField(blank=True, null=True)
    
    # Timestamps
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Programs_Table'
        verbose_name_plural = 'Programs'
        ordering = ['-CreatedAt']
    
    def __str__(self):
        return self.ProgramName
    
    @property
    def days_left(self):
        """Calculate days left until application deadline"""
        if self.ApplicationDeadline:
            delta = self.ApplicationDeadline - timezone.now()
            return max(0, delta.days)
        return None
    
    @property
    def hours_left(self):
        """Calculate hours left until application deadline"""
        if self.ApplicationDeadline:
            delta = self.ApplicationDeadline - timezone.now()
            total_seconds = delta.total_seconds()
            if total_seconds > 0:
                return int((total_seconds % 86400) / 3600)
            return 0
        return None


class Media(models.Model):
    TYPE_CHOICES = [
        ('news', 'News'),
        ('events', 'Events'),
        ('gallery', 'Gallery'),
        ('others', 'Others'),
    ]
    
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('completed', 'Completed'),
    ]
    
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    MediaID = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=255)
    Description = models.TextField()
    Image = models.URLField(max_length=500)
    Type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='news')
    
    # Event-specific fields
    EventStatus = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        blank=True, 
        null=True,
        help_text="Status for event type only"
    )
    EventDate = models.DateTimeField(
        blank=True, 
        null=True,
        help_text="Event date (for upcoming events countdown)"
    )
    LongDescription = models.TextField(
        blank=True,
        null=True,
        help_text="Detailed description for event details page"
    )
    StartDate = models.DateField(
        blank=True,
        null=True,
        help_text="Event start date"
    )
    EndDate = models.DateField(
        blank=True,
        null=True,
        help_text="Event end date"
    )
    StartTime = models.TimeField(
        blank=True,
        null=True,
        help_text="Event start time"
    )
    EndTime = models.TimeField(
        blank=True,
        null=True,
        help_text="Event end time"
    )
    Location = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Event location name"
    )
    LocationAddress = models.TextField(
        blank=True,
        null=True,
        help_text="Full event location address"
    )
    Speaker = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Event speaker name"
    )
    SpeakerImage = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Event speaker image URL"
    )
    Languages = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Event languages (e.g., 'Arabic, English')"
    )
    Fee = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text="Event fee"
    )
    EventFlyer = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Event flyer PDF URL"
    )
    EventFlyerFileName = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Event flyer file name"
    )
    
    # Gallery-specific fields
    MediaType = models.CharField(
        max_length=20,
        choices=MEDIA_TYPE_CHOICES,
        blank=True,
        null=True,
        help_text="Media type for gallery items"
    )
    Facility = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Facility name for gallery items"
    )
    
    # Timestamps
    CreatedAt = models.DateTimeField(auto_now_add=True)
    UpdatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Media'
        verbose_name_plural = 'Media'
        ordering = ['-CreatedAt']
    
    def __str__(self):
        return f"{self.Title} ({self.get_Type_display()})"
    
    @property
    def days_left(self):
        """Calculate days left until event date (for upcoming events)"""
        if self.EventDate and self.Type == 'events' and self.EventStatus == 'upcoming':
            delta = self.EventDate - timezone.now()
            return max(0, delta.days)
        return None
    
    @property
    def hours_left(self):
        """Calculate hours left until event date (for upcoming events)"""
        if self.EventDate and self.Type == 'events' and self.EventStatus == 'upcoming':
            delta = self.EventDate - timezone.now()
            total_seconds = delta.total_seconds()
            if total_seconds > 0:
                return int((total_seconds % 86400) / 3600)
            return 0
        return None