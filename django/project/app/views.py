from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.utils.timezone import now, timedelta
from .models import *
from .workflow_service import workflow_service
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from django.db.models import Count, Q, Prefetch
from datetime import datetime
from django.utils.dateparse import parse_datetime
from django.core.exceptions import ValidationError
from urllib.parse import unquote
import json
import random

# Workflow Management Endpoints

@api_view(['GET'])
@csrf_exempt
def get_workflow_definitions(request):
    """Get all workflow definitions from workflow.json"""
    try:
        workflows = workflow_service.get_workflows()
        return JsonResponse({
            "success": True,
            "data": workflows
        }, status=200)
    except Exception as e:
        return JsonResponse({
            "error": f"Failed to load workflows: {str(e)}"
        }, status=500)


@api_view(['GET'])
@csrf_exempt 
def get_workflow_definition(request, workflow_id):
    """Get specific workflow definition by ID"""
    try:
        workflow = workflow_service.get_workflow_by_id(workflow_id)
        if not workflow:
            return JsonResponse({
                "error": "Workflow not found"
            }, status=404)
        
        return JsonResponse({
            "success": True,
            "data": workflow
        }, status=200)
    except Exception as e:
        return JsonResponse({
            "error": f"Failed to load workflow: {str(e)}"
        }, status=500)


@api_view(['POST'])
@csrf_exempt
def start_workflow(request):
    """
    Start a new workflow instance
    Expected JSON payload:
    {
        "workflow_id": "string",
        "user_email": "email@example.com",
        "user_clerk_id": "string"
    }
    """
    try:
        data = json.loads(request.body) if request.body else {}
        
        # Validate required fields
        required_fields = ['workflow_id', 'user_email', 'user_clerk_id']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return JsonResponse({
                "error": f"Missing required fields: {', '.join(missing_fields)}"
            }, status=400)
        
        # Start workflow instance
        instance = workflow_service.start_workflow_instance(
            workflow_id=data['workflow_id'],
            user_email=data['user_email'],
            user_clerk_id=data['user_clerk_id']
        )
        
        return JsonResponse({
            "success": True,
            "message": "Workflow instance started successfully",
            "data": {
                "instance_id": str(instance.instance_id),
                "workflow_id": instance.workflow_id,
                "workflow_name": instance.workflow_name,
                "current_step_id": instance.current_step_id,
                "status": instance.status,
                "created_at": instance.created_at.isoformat()
            }
        }, status=201)
        
    except ValidationError as e:
        return JsonResponse({
            "error": str(e)
        }, status=400)
    except Exception as e:
        return JsonResponse({
            "error": f"An error occurred: {str(e)}"
        }, status=500)


@api_view(['GET'])
@csrf_exempt
def get_workflow_instance(request, instance_id):
    """Get workflow instance details"""
    try:
        instance = workflow_service.get_workflow_instance(instance_id)
        if not instance:
            return JsonResponse({
                "error": "Workflow instance not found"
            }, status=404)
        
        return JsonResponse({
            "success": True,
            "data": {
                "instance_id": str(instance.instance_id),
                "workflow_id": instance.workflow_id,
                "workflow_name": instance.workflow_name,
                "current_step_id": instance.current_step_id,
                "status": instance.status,
                "initiated_by_email": instance.initiated_by_email,
                "created_at": instance.created_at.isoformat(),
                "updated_at": instance.updated_at.isoformat()
            }
        }, status=200)
        
    except Exception as e:
        return JsonResponse({
            "error": f"An error occurred: {str(e)}"
        }, status=500)


@api_view(['GET'])
@csrf_exempt
def validate_step_access(request, instance_id, step_id):
    """
    Validate if current user can access the specified step
    Requires user_email in query params
    """
    try:
        user_email = request.GET.get('user_email')
        if not user_email:
            return JsonResponse({
                "error": "user_email query parameter required"
            }, status=400)
        
        instance = workflow_service.get_workflow_instance(instance_id)
        if not instance:
            return JsonResponse({
                "error": "Workflow instance not found"
            }, status=404)
        
        is_authorized = workflow_service.is_user_authorized_for_step(
            workflow_id=instance.workflow_id,
            step_id=step_id,
            user_email=user_email,
            instance=instance
        )
        
        if not is_authorized:
            return JsonResponse({
                "error": "Not authorized to access this step",
                "authorized": False
            }, status=403)
        
        # Get step definition with resolved template variables
        step = workflow_service.get_step_by_id(instance.workflow_id, step_id)
        if not step:
            return JsonResponse({
                "error": "Step not found"
            }, status=404)
        
        # Resolve template variables in form fields
        if step.get('form') and step['form'].get('fields'):
            for field in step['form']['fields']:
                if field.get('value'):
                    field['value'] = workflow_service.resolve_template_variables(
                        field['value'], instance
                    )
        
        return JsonResponse({
            "success": True,
            "authorized": True,
            "data": {
                "step": step,
                "instance": {
                    "instance_id": str(instance.instance_id),
                    "current_step_id": instance.current_step_id,
                    "status": instance.status
                }
            }
        }, status=200)
        
    except Exception as e:
        return JsonResponse({
            "error": f"An error occurred: {str(e)}"
        }, status=500)


@api_view(['POST'])
@csrf_exempt
def submit_step_data(request, instance_id, step_id):
    """
    Submit data for a workflow step
    Expected JSON payload:
    {
        "user_email": "email@example.com",
        "step_data": {...}
    }
    """
    try:
        data = json.loads(request.body) if request.body else {}
        
        # Validate required fields
        if not data.get('user_email'):
            return JsonResponse({
                "error": "user_email is required"
            }, status=400)
        
        if 'step_data' not in data:
            return JsonResponse({
                "error": "step_data is required"
            }, status=400)
        
        # Submit step data
        step_execution = workflow_service.submit_step_data(
            instance_id=instance_id,
            step_id=step_id,
            step_data=data['step_data'],
            user_email=data['user_email']
        )
        
        # Get updated instance
        instance = workflow_service.get_workflow_instance(instance_id)
        
        return JsonResponse({
            "success": True,
            "message": "Step data submitted successfully",
            "data": {
                "step_execution_id": step_execution.execution_id,
                "instance": {
                    "instance_id": str(instance.instance_id),
                    "current_step_id": instance.current_step_id,
                    "status": instance.status,
                    "updated_at": instance.updated_at.isoformat()
                }
            }
        }, status=200)
        
    except ValidationError as e:
        return JsonResponse({
            "error": str(e)
        }, status=400)
    except Exception as e:
        return JsonResponse({
            "error": f"An error occurred: {str(e)}"
        }, status=500)


@api_view(['GET'])
@csrf_exempt
def get_pending_workflows_for_user(request):
    """Get all workflows with pending steps assigned to the current user"""
    try:
        from urllib.parse import unquote
        
        user_email = request.GET.get('user_email')
        if not user_email:
            return JsonResponse({
                "error": "user_email parameter is required"
            }, status=400)
        
        # URL decode the email parameter (handle %40 -> @)
        user_email = unquote(user_email)
        print(f"🔍 Looking for pending workflows for user: {user_email}")
        
        # Get all workflow instances with pending steps assigned to the user
        pending_step_executions = StepExecution.objects.filter(
            assigned_to_email=user_email,
            status='pending'
        ).select_related('workflow_instance')
        
        print(f"📊 Found {pending_step_executions.count()} pending step executions")
        
        # Group by workflow instance and prepare response data
        pending_workflows = []
        for step_execution in pending_step_executions:
            instance = step_execution.workflow_instance
            
            print(f"📋 Processing step: {step_execution.step_name} for workflow {instance.workflow_name}")
            
            # Get workflow definition to get workflow name
            try:
                workflow_definition = workflow_service.get_workflow_by_id(instance.workflow_id)
                workflow_name = workflow_definition['name']
            except:
                workflow_name = instance.workflow_name
            
            pending_workflows.append({
                "instance_id": str(instance.instance_id),
                "workflow_id": instance.workflow_id,
                "workflow_name": workflow_name,
                "current_step_id": step_execution.step_id,
                "step_name": step_execution.step_name,
                "initiated_by_email": instance.initiated_by_email,
                "created_at": instance.created_at.isoformat(),
                "step_created_at": step_execution.created_at.isoformat(),
                "status": instance.status
            })
        
        
        print(f"✅ Returning {len(pending_workflows)} pending workflows")
        
        return JsonResponse({
            "success": True,
            "data": pending_workflows,
            "count": len(pending_workflows)
        }, status=200)
        
    except Exception as e:
        print(f"❌ Error in get_pending_workflows_for_user: {str(e)}")
        return JsonResponse({
            "error": f"An error occurred: {str(e)}"
        }, status=500)


@api_view(['GET'])
def get_workflow_instances(request):
    """
    Get all workflow instances with filtering options
    Query parameters:
    - status: Filter by workflow status (started, in_progress, completed, cancelled)
    - assigned_to: Filter by user email who has pending assignments
    - created_after: Filter by creation date (ISO format)
    - created_before: Filter by creation date (ISO format)
    - initiated_by: Filter by user who initiated the workflow
    - limit: Limit number of results (default: 100)
    - offset: Pagination offset (default: 0)
    """
    try:
        # Parse query parameters
        status = request.GET.get('status')
        assigned_to = request.GET.get('assigned_to')
        created_after = request.GET.get('created_after')
        created_before = request.GET.get('created_before')
        initiated_by = request.GET.get('initiated_by')
        limit = min(int(request.GET.get('limit', 100)), 500)  # Cap at 500
        offset = int(request.GET.get('offset', 0))
        
        print(f"🔍 Filtering workflow instances with params: status={status}, assigned_to={assigned_to}, initiated_by={initiated_by}")
        
        # Start with all instances
        queryset = WorkflowInstance.objects.all()
        
        # Apply filters
        if status:
            queryset = queryset.filter(status=status)
            
        if initiated_by:
            initiated_by = unquote(initiated_by)
            queryset = queryset.filter(initiated_by_email=initiated_by)
            
        if created_after:
            try:
                created_after_dt = parse_datetime(created_after)
                if created_after_dt:
                    queryset = queryset.filter(created_at__gte=created_after_dt)
            except:
                pass
                
        if created_before:
            try:
                created_before_dt = parse_datetime(created_before)
                if created_before_dt:
                    queryset = queryset.filter(created_at__lte=created_before_dt)
            except:
                pass
        
        # Filter by assignment - only current pending steps assigned to user
        if assigned_to:
            assigned_to = unquote(assigned_to)
            # Find instances where the current step is pending and assigned to this user
            assigned_instance_ids = []
            for instance in WorkflowInstance.objects.all():
                if instance.current_step_id:
                    current_step = instance.step_executions.filter(
                        step_id=instance.current_step_id,
                        status='pending',
                        assigned_to_email=assigned_to
                    ).first()
                    if current_step:
                        assigned_instance_ids.append(instance.instance_id)
            
            queryset = queryset.filter(instance_id__in=assigned_instance_ids)
        
        # Order by creation date (newest first)
        queryset = queryset.order_by('-created_at')
        
        # Get total count before pagination
        total_count = queryset.count()
        
        # Apply pagination
        instances = queryset[offset:offset + limit]
        
        # Prefetch related step executions for each instance
        instances = instances.prefetch_related(
            Prefetch(
                'step_executions',
                queryset=StepExecution.objects.order_by('created_at')
            )
        )
        
        # Prepare response data
        instances_data = []
        for instance in instances:
            # Get current step info
            current_step = None
            if instance.current_step_id:
                current_step_execution = instance.step_executions.filter(
                    step_id=instance.current_step_id
                ).first()
                if current_step_execution:
                    current_step = {
                        "step_id": current_step_execution.step_id,
                        "step_name": current_step_execution.step_name,
                        "status": current_step_execution.status,
                        "assigned_to_email": current_step_execution.assigned_to_email,
                        "executed_by_email": current_step_execution.executed_by_email,
                        "started_at": current_step_execution.started_at.isoformat() if current_step_execution.started_at else None,
                        "completed_at": current_step_execution.completed_at.isoformat() if current_step_execution.completed_at else None
                    }
            
            # Get all step executions for progress tracking
            steps = []
            for step_exec in instance.step_executions.all():
                steps.append({
                    "step_id": step_exec.step_id,
                    "step_name": step_exec.step_name,
                    "status": step_exec.status,
                    "assigned_to_email": step_exec.assigned_to_email,
                    "executed_by_email": step_exec.executed_by_email,
                    "started_at": step_exec.started_at.isoformat() if step_exec.started_at else None,
                    "completed_at": step_exec.completed_at.isoformat() if step_exec.completed_at else None,
                    "created_at": step_exec.created_at.isoformat()
                })
            
            # Try to get workflow name and total steps count from service
            workflow_name = instance.workflow_name
            total_steps_count = len(steps)  # fallback to actual steps
            try:
                workflow_definition = workflow_service.get_workflow_by_id(instance.workflow_id)
                workflow_name = workflow_definition['name']
                # Get total steps count from workflow definition
                if 'steps' in workflow_definition:
                    total_steps_count = len(workflow_definition['steps'])
            except:
                pass
            
            instances_data.append({
                "instance_id": str(instance.instance_id),
                "workflow_id": instance.workflow_id,
                "workflow_name": workflow_name,
                "current_step_id": instance.current_step_id,
                "current_step": current_step,
                "status": instance.status,
                "initiated_by_email": instance.initiated_by_email,
                "initiated_by_clerk_id": instance.initiated_by_clerk_id,
                "created_at": instance.created_at.isoformat(),
                "updated_at": instance.updated_at.isoformat(),
                "completed_at": instance.completed_at.isoformat() if instance.completed_at else None,
                "steps": steps,
                "steps_count": total_steps_count
            })
        
        print(f"✅ Returning {len(instances_data)} workflow instances (total: {total_count})")
        
        return JsonResponse({
            "success": True,
            "data": instances_data,
            "pagination": {
                "total_count": total_count,
                "count": len(instances_data),
                "limit": limit,
                "offset": offset,
                "has_more": offset + limit < total_count
            }
        }, status=200)
        
    except Exception as e:
        print(f"❌ Error in get_workflow_instances: {str(e)}")
        return JsonResponse({
            "error": f"An error occurred: {str(e)}"
        }, status=500)


@api_view(['POST'])
@csrf_exempt
def user_created(request):
    """
    Handle user creation from Clerk webhook
    Expected JSON payload:
    {
        "email": "user@example.com"
    }
    """
    try:
        data = json.loads(request.body)
        email = data.get('email')
        
        if not email:
            return JsonResponse({
                'error': 'Email is required'
            }, status=400)
        
        # Check if user already exists
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email.split('@')[0],
                'is_active': True,
                'is_staff': False
            }
        )
        
        if created:
            # Set unusable password since auth is handled by Clerk
            user.set_unusable_password()
            user.save()
            
            # Assign to default User group
            user_group, _ = Group.objects.get_or_create(name='User')
            user.groups.add(user_group)
            
            return JsonResponse({
                'message': 'User created successfully',
                'user_id': user.id,
                'email': user.email,
                'created': True
            }, status=201)
        else:
            return JsonResponse({
                'message': 'User already exists',
                'user_id': user.id,
                'email': user.email,
                'created': False
            }, status=200)
            
    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON payload'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'error': f'Internal server error: {str(e)}'
        }, status=500)


# @api_view(['GET'])
# def check_user_exists(request, email):
#     try:
#         Users = apps.get_model(app_label='app', model_name='Users')  # Adjust 'app' to your actual app name
        
#         email = email.strip()
#         if not email:
#             return JsonResponse({"error": "Email parameter is required."}, status=400)

#         user_exists = Users.objects.filter(Email=email).exists()

#         return JsonResponse({"data": user_exists})

#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)

# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Roles, Permissions, RolePermissions, Users, UserRoles, EmailSettings, StatusDictionary, Integrations, AuditLog

# Roles CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def roles_view(request, id=None):
    if request.method == 'GET':
        if id:
            role = Roles.objects.get(RoleID=id)
            return Response({"RoleID": role.RoleID, "RoleName": role.RoleName}, status=status.HTTP_200_OK)
        roles = Roles.objects.all()
        return Response([{"RoleID": role.RoleID, "RoleName": role.RoleName} for role in roles], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        role = Roles.objects.create(RoleName=request.data['RoleName'])
        return Response({"RoleID": role.RoleID, "RoleName": role.RoleName}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        role = Roles.objects.get(RoleID=id)
        role.RoleName = request.data.get('RoleName', role.RoleName)
        role.save()
        return Response({"RoleID": role.RoleID, "RoleName": role.RoleName}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        role = Roles.objects.get(RoleID=id)
        role.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Permissions CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def permissions_view(request, id=None):
    if request.method == 'GET':
        if id:
            permission = Permissions.objects.get(PermissionID=id)
            return Response({"PermissionID": permission.PermissionID, "PermissionName": permission.PermissionName}, status=status.HTTP_200_OK)
        permissions = Permissions.objects.all()
        return Response([{"PermissionID": permission.PermissionID, "PermissionName": permission.PermissionName} for permission in permissions], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        permission = Permissions.objects.create(PermissionName=request.data['PermissionName'])
        return Response({"PermissionID": permission.PermissionID, "PermissionName": permission.PermissionName}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        permission = Permissions.objects.get(PermissionID=id)
        permission.PermissionName = request.data.get('PermissionName', permission.PermissionName)
        permission.save()
        return Response({"PermissionID": permission.PermissionID, "PermissionName": permission.PermissionName}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        permission = Permissions.objects.get(PermissionID=id)
        permission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Role Permissions CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def role_permissions_view(request, id=None):
    if request.method == 'GET':
        if id:
            role_permission = RolePermissions.objects.get(RolePermissionID=id)
            return Response({"RolePermissionID": role_permission.RolePermissionID, "RoleID": role_permission.RoleID.RoleID, "PermissionID": role_permission.PermissionID.PermissionID}, status=status.HTTP_200_OK)
        role_permissions = RolePermissions.objects.all()
        return Response([{"RolePermissionID": rp.RolePermissionID, "RoleID": rp.RoleID.RoleID, "PermissionID": rp.PermissionID.PermissionID} for rp in role_permissions], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        rp = RolePermissions.objects.create(RoleID=request.data['RoleID'], PermissionID=request.data['PermissionID'])
        return Response({"RolePermissionID": rp.RolePermissionID, "RoleID": rp.RoleID.RoleID, "PermissionID": rp.PermissionID.PermissionID}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        rp = RolePermissions.objects.get(RolePermissionID=id)
        rp.RoleID = request.data.get('RoleID', rp.RoleID)
        rp.PermissionID = request.data.get('PermissionID', rp.PermissionID)
        rp.save()
        return Response({"RolePermissionID": rp.RolePermissionID, "RoleID": rp.RoleID.RoleID, "PermissionID": rp.PermissionID.PermissionID}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        rp = RolePermissions.objects.get(RolePermissionID=id)
        rp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Users CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def users_view(request, id=None):
    if request.method == 'GET':
        if id:
            user = Users.objects.get(UserID=id)
            return Response({"UserID": user.UserID, "Username": user.Username, "Email": user.Email, "IsActive": user.IsActive}, status=status.HTTP_200_OK)
        users = Users.objects.all()
        return Response([{"UserID": user.UserID, "Username": user.Username, "Email": user.Email, "IsActive": user.IsActive} for user in users], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        user = Users.objects.create(
            Username=request.data['Username'],
            PasswordHash=request.data['PasswordHash'],
            Email=request.data['Email'],
            IsActive=request.data.get('IsActive', True)
        )
        return Response({"UserID": user.UserID, "Username": user.Username, "Email": user.Email, "IsActive": user.IsActive}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        user = Users.objects.get(UserID=id)
        user.Username = request.data.get('Username', user.Username)
        user.PasswordHash = request.data.get('PasswordHash', user.PasswordHash)
        user.Email = request.data.get('Email', user.Email)
        user.IsActive = request.data.get('IsActive', user.IsActive)
        user.save()
        return Response({"UserID": user.UserID, "Username": user.Username, "Email": user.Email, "IsActive": user.IsActive}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        user = Users.objects.get(UserID=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# User Roles CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_roles_view(request, id=None):
    if request.method == 'GET':
        if id:
            user_role = UserRoles.objects.get(UserRoleID=id)
            return Response({"UserRoleID": user_role.UserRoleID, "UserID": user_role.UserID.UserID, "RoleID": user_role.RoleID.RoleID}, status=status.HTTP_200_OK)
        user_roles = UserRoles.objects.all()
        return Response([{"UserRoleID": ur.UserRoleID, "UserID": ur.UserID.UserID, "RoleID": ur.RoleID.RoleID} for ur in user_roles], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        ur = UserRoles.objects.create(UserID=request.data['UserID'], RoleID=request.data['RoleID'])
        return Response({"UserRoleID": ur.UserRoleID, "UserID": ur.UserID.UserID, "RoleID": ur.RoleID.RoleID}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        ur = UserRoles.objects.get(UserRoleID=id)
        ur.UserID = request.data.get('UserID', ur.UserID)
        ur.RoleID = request.data.get('RoleID', ur.RoleID)
        ur.save()
        return Response({"UserRoleID": ur.UserRoleID, "UserID": ur.UserID.UserID, "RoleID": ur.RoleID.RoleID}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        ur = UserRoles.objects.get(UserRoleID=id)
        ur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Email Settings CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def email_settings_view(request, id=None):
    if request.method == 'GET':
        if id:
            email_setting = EmailSettings.objects.get(EmailSettingID=id)
            return Response({"EmailSettingID": email_setting.EmailSettingID, "SmtpServer": email_setting.SmtpServer, "SmtpPort": email_setting.SmtpPort}, status=status.HTTP_200_OK)
        email_settings = EmailSettings.objects.all()
        return Response([{"EmailSettingID": es.EmailSettingID, "SmtpServer": es.SmtpServer, "SmtpPort": es.SmtpPort} for es in email_settings], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        email_setting = EmailSettings.objects.create(
            SmtpServer=request.data['SmtpServer'],
            SmtpPort=request.data['SmtpPort'],
            Username=request.data['Username'],
            PasswordHash=request.data['PasswordHash'],
            IsEnabled=request.data.get('IsEnabled', False)
        )
        return Response({"EmailSettingID": email_setting.EmailSettingID, "SmtpServer": email_setting.SmtpServer, "SmtpPort": email_setting.SmtpPort}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        email_setting = EmailSettings.objects.get(EmailSettingID=id)
        email_setting.SmtpServer = request.data.get('SmtpServer', email_setting.SmtpServer)
        email_setting.SmtpPort = request.data.get('SmtpPort', email_setting.SmtpPort)
        email_setting.Username = request.data.get('Username', email_setting.Username)
        email_setting.PasswordHash = request.data.get('PasswordHash', email_setting.PasswordHash)
        email_setting.IsEnabled = request.data.get('IsEnabled', email_setting.IsEnabled)
        email_setting.save()
        return Response({"EmailSettingID": email_setting.EmailSettingID, "SmtpServer": email_setting.SmtpServer, "SmtpPort": email_setting.SmtpPort}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        email_setting = EmailSettings.objects.get(EmailSettingID=id)
        email_setting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Status Dictionary CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def status_dictionary_view(request, id=None):
    if request.method == 'GET':
        if id:
            status_dict = StatusDictionary.objects.get(StatusID=id)
            return Response({"StatusID": status_dict.StatusID, "StatusCode": status_dict.StatusCode, "StatusName": status_dict.StatusName}, status=status.HTTP_200_OK)
        status_dicts = StatusDictionary.objects.all()
        return Response([{"StatusID": sd.StatusID, "StatusCode": sd.StatusCode, "StatusName": sd.StatusName} for sd in status_dicts], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        status_dict = StatusDictionary.objects.create(
            StatusCode=request.data['StatusCode'],
            StatusName=request.data['StatusName'],
            StageClassification=request.data['StageClassification']
        )
        return Response({"StatusID": status_dict.StatusID, "StatusCode": status_dict.StatusCode, "StatusName": status_dict.StatusName}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        status_dict = StatusDictionary.objects.get(StatusID=id)
        status_dict.StatusCode = request.data.get('StatusCode', status_dict.StatusCode)
        status_dict.StatusName = request.data.get('StatusName', status_dict.StatusName)
        status_dict.StageClassification = request.data.get('StageClassification', status_dict.StageClassification)
        status_dict.save()
        return Response({"StatusID": status_dict.StatusID, "StatusCode": status_dict.StatusCode, "StatusName": status_dict.StatusName}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        status_dict = StatusDictionary.objects.get(StatusID=id)
        status_dict.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Integrations CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def integrations_view(request, id=None):
    if request.method == 'GET':
        if id:
            integration = Integrations.objects.get(IntegrationID=id)
            return Response({"IntegrationID": integration.IntegrationID, "IntegrationName": integration.IntegrationName}, status=status.HTTP_200_OK)
        integrations = Integrations.objects.all()
        return Response([{"IntegrationID": integration.IntegrationID, "IntegrationName": integration.IntegrationName} for integration in integrations], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        integration = Integrations.objects.create(
            IntegrationName=request.data['IntegrationName'],
            ApiKey=request.data['ApiKey'],
            IsEnabled=request.data.get('IsEnabled', False)
        )
        return Response({"IntegrationID": integration.IntegrationID, "IntegrationName": integration.IntegrationName}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        integration = Integrations.objects.get(IntegrationID=id)
        integration.IntegrationName = request.data.get('IntegrationName', integration.IntegrationName)
        integration.ApiKey = request.data.get('ApiKey', integration.ApiKey)
        integration.IsEnabled = request.data.get('IsEnabled', integration.IsEnabled)
        integration.save()
        return Response({"IntegrationID": integration.IntegrationID, "IntegrationName": integration.IntegrationName}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        integration = Integrations.objects.get(IntegrationID=id)
        integration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Audit Log CRUD operations
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def audit_log_view(request, id=None):
    if request.method == 'GET':
        if id:
            audit_log = AuditLog.objects.get(AuditLogID=id)
            return Response({"AuditLogID": audit_log.AuditLogID, "Action": audit_log.Action, "UserID": audit_log.UserID.UserID if audit_log.UserID else None}, status=status.HTTP_200_OK)
        audit_logs = AuditLog.objects.all()
        return Response([{"AuditLogID": al.AuditLogID, "Action": al.Action, "UserID": al.UserID.UserID if al.UserID else None} for al in audit_logs], status=status.HTTP_200_OK)

    elif request.method == 'POST':
        audit_log = AuditLog.objects.create(
            Action=request.data['Action'],
            UserID=request.data.get('UserID'),
            Metadata=request.data.get('Metadata')
        )
        return Response({"AuditLogID": audit_log.AuditLogID, "Action": audit_log.Action, "UserID": audit_log.UserID.UserID if audit_log.UserID else None}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        audit_log = AuditLog.objects.get(AuditLogID=id)
        audit_log.Action = request.data.get('Action', audit_log.Action)
        audit_log.UserID = request.data.get('UserID', audit_log.UserID)
        audit_log.Metadata = request.data.get('Metadata', audit_log.Metadata)
        audit_log.save()
        return Response({"AuditLogID": audit_log.AuditLogID, "Action": audit_log.Action, "UserID": audit_log.UserID.UserID if audit_log.UserID else None}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        audit_log = AuditLog.objects.get(AuditLogID=id)
        audit_log.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


# ==================== PROGRAMS VIEWS ====================

@api_view(['GET'])
def list_programs(request):
    """
    List all programs with filtering, sorting, and pagination support
    Query parameters:
    - status: filter by status (open, upcoming, closed, all)
    - search: search in program name, description, and target audience
    - sort: sort order (recent, oldest, name, name-desc)
    - email: filter by user group access
    - start_date: filter programs starting from this date (YYYY-MM-DD)
    - end_date: filter programs ending before this date (YYYY-MM-DD)
    - page: page number (default: 1)
    - per_page: items per page (default: 9)
    """
    try:
        # Get query parameters
        status_filter = request.GET.get('status', 'all')
        search_query = request.GET.get('search', '')
        sort_order = request.GET.get('sort', 'recent')
        user_email = request.GET.get('email', None)
        start_date = request.GET.get('start_date', None)
        end_date = request.GET.get('end_date', None)
        page = int(request.GET.get('page', 1))
        per_page = int(request.GET.get('per_page', 9))
        
        # Start with all programs
        programs = Program.objects.all()
        
        # Filter by status if provided
        if status_filter and status_filter != 'all':
            programs = programs.filter(Status=status_filter)
        
        # Search filter
        if search_query:
            from django.db.models import Q
            programs = programs.filter(
                Q(ProgramName__icontains=search_query) |
                Q(ProgramDescription__icontains=search_query) |
                Q(TargetAudience__icontains=search_query)
            )
        
        # Date range filter
        if start_date:
            try:
                start_date_parsed = datetime.strptime(start_date, '%Y-%m-%d').date()
                programs = programs.filter(StartDate__gte=start_date_parsed)
            except ValueError:
                pass  # Invalid date format, skip filter
        
        if end_date:
            try:
                end_date_parsed = datetime.strptime(end_date, '%Y-%m-%d').date()
                programs = programs.filter(StartDate__lte=end_date_parsed)
            except ValueError:
                pass  # Invalid date format, skip filter
        
        # Filter by user group if email provided
        if user_email:
            try:
                user = User.objects.get(email=user_email)
                user_groups = user.groups.all()
                programs = programs.filter(program_groups__group__in=user_groups).distinct()
            except User.DoesNotExist:
                pass
        
        # Apply sorting
        if sort_order == 'recent':
            programs = programs.order_by('-StartDate', '-CreatedAt')
        elif sort_order == 'oldest':
            programs = programs.order_by('StartDate', 'CreatedAt')
        elif sort_order == 'name':
            programs = programs.order_by('ProgramName')
        elif sort_order == 'name-desc':
            programs = programs.order_by('-ProgramName')
        else:
            programs = programs.order_by('-CreatedAt')
        
        # Calculate pagination
        total_programs = programs.count()
        total_pages = (total_programs + per_page - 1) // per_page  # Ceiling division
        
        # Apply pagination
        start_index = (page - 1) * per_page
        end_index = start_index + per_page
        programs = programs[start_index:end_index]
        
        # Serialize programs
        programs_data = []
        for program in programs:
            program_dict = {
                'ProgramID': str(program.ProgramID),
                'ProgramName': program.ProgramName,
                'ProgramDescription': program.ProgramDescription,
                'ProgramImage': program.ProgramImage,
                'Duration': program.Duration,
                'Language': program.Language,
                'Location': program.Location,
                'TargetAudience': program.TargetAudience,
                'Status': program.Status,
                'StartDate': program.StartDate.isoformat() if program.StartDate else None,
                'EndDate': program.EndDate.isoformat() if program.EndDate else None,
                'DaysLeft': program.days_left,
                'HoursLeft': program.hours_left,
            }
            programs_data.append(program_dict)
        
        return Response({
            "programs": programs_data,
            "total": total_programs,
            "page": page,
            "per_page": per_page,
            "total_pages": total_pages,
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_program(request, program_id):
    """
    Get a single program by ID
    """
    try:
        program = Program.objects.get(ProgramID=program_id)
        
        program_data = {
            'ProgramID': str(program.ProgramID),
            'ProgramName': program.ProgramName,
            'ProgramDescription': program.ProgramDescription,
            'ProgramImage': program.ProgramImage,
            'Duration': program.Duration,
            'Language': program.Language,
            'Location': program.Location,
            'TargetAudience': program.TargetAudience,
            'Status': program.Status,
            'Requirements': program.Requirements,
            'Benefits': program.Benefits,
            'Curriculum': program.Curriculum,
            'StartDate': program.StartDate.isoformat() if program.StartDate else None,
            'EndDate': program.EndDate.isoformat() if program.EndDate else None,
            'ApplicationDeadline': program.ApplicationDeadline.isoformat() if program.ApplicationDeadline else None,
            'DaysLeft': program.days_left,
            'HoursLeft': program.hours_left,
            'CreatedAt': program.CreatedAt.isoformat() if program.CreatedAt else None,
            'UpdatedAt': program.UpdatedAt.isoformat() if program.UpdatedAt else None,
        }
        
        return Response({
            "program": program_data
        }, status=status.HTTP_200_OK)
        
    except Program.DoesNotExist:
        return Response({"error": "Program not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Media Endpoints

@api_view(['GET'])
def list_media(request):
    """
    List all media items with filtering, sorting, and pagination support
    Query parameters:
    - type: filter by type (news, events, gallery, others, all)
    - search: search in title and description
    - sort: sort order (recent, oldest, title, title-desc)
    - date: filter by start date (YYYY-MM-DD) - events from this date onwards
    - media_type: filter by media type (image, video) - for gallery
    - event_status: filter by event status (upcoming, completed) - for events
    - page: page number (default: 1)
    - per_page: items per page (default: 8)
    """
    try:
        # Get query parameters
        type_filter = request.GET.get('type', 'all')
        search_query = request.GET.get('search', '')
        sort_order = request.GET.get('sort', 'recent')
        date_filter = request.GET.get('date', '')
        media_type_filter = request.GET.get('media_type', 'all')
        event_status_filter = request.GET.get('event_status', 'all')
        page = int(request.GET.get('page', 1))
        per_page = int(request.GET.get('per_page', 8))
        
        # Start with all media
        media_items = Media.objects.all()
        
        # Filter by type if provided
        if type_filter and type_filter != 'all':
            media_items = media_items.filter(Type=type_filter)
        
        # Filter by start date (events from this date onwards)
        if date_filter:
            from datetime import datetime
            try:
                filter_date = datetime.strptime(date_filter, '%Y-%m-%d').date()
                media_items = media_items.filter(EventDate__date__gte=filter_date)
            except ValueError:
                pass  # Invalid date format, ignore filter
        
        # Filter by media type (image/video) - only for gallery
        if media_type_filter and media_type_filter != 'all':
            media_items = media_items.filter(MediaType=media_type_filter)
        
        # Filter by event status (upcoming/completed) - only for events
        if event_status_filter and event_status_filter != 'all':
            media_items = media_items.filter(EventStatus=event_status_filter)
        
        # Search filter
        if search_query:
            from django.db.models import Q
            media_items = media_items.filter(
                Q(Title__icontains=search_query) |
                Q(Description__icontains=search_query)
            )
        
        # Apply sorting
        if sort_order == 'recent':
            media_items = media_items.order_by('-CreatedAt')
        elif sort_order == 'oldest':
            media_items = media_items.order_by('CreatedAt')
        elif sort_order == 'title':
            media_items = media_items.order_by('Title')
        elif sort_order == 'title-desc':
            media_items = media_items.order_by('-Title')
        else:
            media_items = media_items.order_by('-CreatedAt')
        
        # Calculate pagination
        total_media = media_items.count()
        total_pages = (total_media + per_page - 1) // per_page  # Ceiling division
        
        # Apply pagination
        start_index = (page - 1) * per_page
        end_index = start_index + per_page
        media_items = media_items[start_index:end_index]
        
        # Serialize media
        media_data = []
        for media in media_items:
            media_dict = {
                'MediaID': str(media.MediaID),
                'Title': media.Title,
                'Description': media.Description,
                'Image': media.Image,
                'Type': media.Type,
                'EventStatus': media.EventStatus,
                'EventDate': media.EventDate.isoformat() if media.EventDate else None,
                'MediaType': media.MediaType,
                'Facility': media.Facility,
                'DaysLeft': media.days_left,
                'HoursLeft': media.hours_left,
                'CreatedAt': media.CreatedAt.isoformat() if media.CreatedAt else None,
                'UpdatedAt': media.UpdatedAt.isoformat() if media.UpdatedAt else None,
                # Event-specific fields
                'LongDescription': media.LongDescription,
                'StartDate': media.StartDate.isoformat() if media.StartDate else None,
                'EndDate': media.EndDate.isoformat() if media.EndDate else None,
                'StartTime': media.StartTime.strftime('%H:%M') if media.StartTime else None,
                'EndTime': media.EndTime.strftime('%H:%M') if media.EndTime else None,
                'Location': media.Location,
                'LocationAddress': media.LocationAddress,
                'Speaker': media.Speaker,
                'SpeakerImage': media.SpeakerImage,
                'Languages': media.Languages,
                'Fee': media.Fee,
                'EventFlyer': media.EventFlyer,
                'EventFlyerFileName': media.EventFlyerFileName,
            }
            media_data.append(media_dict)
        
        return Response({
            "media": media_data,
            "total": total_media,
            "page": page,
            "per_page": per_page,
            "total_pages": total_pages,
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_media(request, media_id):
    """
    Get a single media item by ID with all event-specific fields
    and related events for event type
    """
    try:
        media = Media.objects.get(MediaID=media_id)
        
        media_data = {
            'MediaID': str(media.MediaID),
            'Title': media.Title,
            'Description': media.Description,
            'Image': media.Image,
            'Type': media.Type,
            'EventStatus': media.EventStatus,
            'EventDate': media.EventDate.isoformat() if media.EventDate else None,
            'MediaType': media.MediaType,
            'Facility': media.Facility,
            'DaysLeft': media.days_left,
            'HoursLeft': media.hours_left,
            'CreatedAt': media.CreatedAt.isoformat() if media.CreatedAt else None,
            'UpdatedAt': media.UpdatedAt.isoformat() if media.UpdatedAt else None,
            # Event-specific fields
            'LongDescription': media.LongDescription,
            'StartDate': media.StartDate.isoformat() if media.StartDate else None,
            'EndDate': media.EndDate.isoformat() if media.EndDate else None,
            'StartTime': media.StartTime.strftime('%H:%M') if media.StartTime else None,
            'EndTime': media.EndTime.strftime('%H:%M') if media.EndTime else None,
            'Location': media.Location,
            'LocationAddress': media.LocationAddress,
            'Speaker': media.Speaker,
            'SpeakerImage': media.SpeakerImage,
            'Languages': media.Languages,
            'Fee': media.Fee,
            'EventFlyer': media.EventFlyer,
            'EventFlyerFileName': media.EventFlyerFileName,
        }
        
        # Get related events for event type media
        related_events = []
        if media.Type == 'events':
            related_media = Media.objects.filter(
                Type='events'
            ).exclude(
                MediaID=media_id
            ).order_by('-CreatedAt')[:4]
            
            for related in related_media:
                related_events.append({
                    'MediaID': str(related.MediaID),
                    'Title': related.Title,
                    'Description': related.Description,
                    'Image': related.Image,
                    'Type': related.Type,
                    'EventStatus': related.EventStatus,
                    'EventDate': related.EventDate.isoformat() if related.EventDate else None,
                    'DaysLeft': related.days_left,
                    'HoursLeft': related.hours_left,
                })
        
        return Response({
            "media": media_data,
            "related_events": related_events
        }, status=status.HTTP_200_OK)
        
    except Media.DoesNotExist:
        return Response({"error": "Media not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
