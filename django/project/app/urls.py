from django.urls import path
from . import views

from .views import roles_view, permissions_view, role_permissions_view, users_view, user_roles_view, email_settings_view, status_dictionary_view, integrations_view, audit_log_view

urlpatterns = [
    path('userCreated', views.user_created, name='user_created'),
    # Workflow Management Endpoints
    path('workflows/', views.get_workflow_definitions, name='get_workflow_definitions'),
    path('workflows/pending/', views.get_pending_workflows_for_user, name='get_pending_workflows_for_user'),
    path('workflows/instances/', views.get_workflow_instances, name='get_workflow_instances'),
    path('workflows/instances/start/', views.start_workflow, name='start_workflow'),
    path('workflows/instances/<str:instance_id>/', views.get_workflow_instance, name='get_workflow_instance'),
    path('workflows/<str:workflow_id>/', views.get_workflow_definition, name='get_workflow_definition'),
    path('workflows/instances/<str:instance_id>/steps/<str:step_id>/validate/', views.validate_step_access, name='validate_step_access'),
    path('workflows/instances/<str:instance_id>/steps/<str:step_id>/submit/', views.submit_step_data, name='submit_step_data'),
     # path('check_user_exists/<str:email>', views.check_user_exists, name='check_user_exists'),


         path('roles/', roles_view),
    path('roles/<int:id>/', roles_view),
    path('permissions/', permissions_view),
    path('permissions/<int:id>/', permissions_view),
    path('role-permissions/', role_permissions_view),
    path('role-permissions/<int:id>/', role_permissions_view),
    path('users/', users_view),
    path('users/<int:id>/', users_view),
    path('user-roles/', user_roles_view),
    path('user-roles/<int:id>/', user_roles_view),
    path('email-settings/', email_settings_view),
    path('email-settings/<int:id>/', email_settings_view),
    path('status-dictionary/', status_dictionary_view),
    path('status-dictionary/<int:id>/', status_dictionary_view),
    path('integrations/', integrations_view),
    path('integrations/<int:id>/', integrations_view),
    path('audit-log/', audit_log_view),
    path('audit-log/<int:id>/', audit_log_view),
    
    # Success Stories Endpoints
    path('success-stories/', views.get_success_stories, name='get_success_stories'),
    path('success-stories/<int:story_id>/', views.get_success_story_detail, name='get_success_story_detail'),
    path('success-stories/categories/', views.get_success_story_categories, name='get_success_story_categories'),
]
