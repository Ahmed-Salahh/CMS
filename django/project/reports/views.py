from django.contrib.auth.models import User
from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
import jwt
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Group
from reports.models import *

def execute_sql_query(query, params=None):
    """
    Executes a raw SQL query and returns the results as a list of dictionaries.
    """
    with connection.cursor() as cursor:
        cursor.execute(query, params or [])
        # Get column names from the cursor description
        columns = [col[0] for col in cursor.description]
        # Fetch all rows and convert to a list of dictionaries
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return results

@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')

    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user exists, or create one
    user, created = User.objects.get_or_create(email=email, defaults={
        "username": email.split("@")[0],
        "is_active": False,
        "is_staff": False
    })

    # Ensure user_group is always defined
    user_group, _ = Group.objects.get_or_create(name='User')

    if created:
        # Set a random password and make the user inactive
        user.set_unusable_password()
        user.save()

        # Assign the user to the "User" group
        user.groups.add(user_group)

    return Response({
        "is_active": user.is_active,
        "user_created": created,
        "user_group": user_group.name  # Ensure a valid response value
    })

@api_view(['GET'])
def check_user_exists(request, email):
    try:
        # Users = apps.get_model(app_label='app', model_name='Users')  # Adjust 'app' to your actual app name
        
        email = email.strip()
        if not email:
            return JsonResponse({"error": "Email parameter is required."}, status=400)

        user_exists = User.objects.filter(email=email).exists()

        return JsonResponse({"data": user_exists})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@api_view(['Post'])
def microsoft_login(request):

    # token = request.headers.get("Authorization").split("Bearer ")[-1]
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return 401, 'Missing Authorization key'

    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        return 401, 'Invalid Bearer Token'
     
    decoded_token = jwt.decode(token, options={"verify_signature": False})
    
    email = decoded_token.get("unique_name") or decoded_token.get("upn")

    if not email:
        return Response({"error": "Email not found in token"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user exists, or create one
    user, created = User.objects.get_or_create(email=email, defaults={
        "username": email.split("@")[0],
        "is_active": False,
        "is_staff": False
    })
    
    if created:
        # Set a random password and make the user inactive
        user.set_unusable_password()
        user.save()

    # Generate a Django token
    django_token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "django_token": django_token.key,
        "is_active": user.is_active,
        "user_created": created
    })

def authenticate_user(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return 401, 'Missing Authorization key'

    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        
        try:
            token_obj = Token.objects.get(key=token)
        except ObjectDoesNotExist: 
            return 401, 'Token not found'

        if token_obj:
            user_info = token_obj.user
            if user_info.is_active:
                return 200, user_info
            else:
                return 401, 'Inactive User'
        else:
            return 401, 'Invalid Token'
    
    return 401, 'Invalid Bearer Token'

def list_reports(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({"error": "Email parameter is required"}, status=400)

    user = get_object_or_404(User, email=email)

    user_groups = user.groups.all() 

    # Get reports that are linked to these groups
    reports = Reports.objects.filter(reportgroup__group__in=user_groups).distinct().values(
        'ReportID', 'ReportName', 'ReportType'
    )

    return JsonResponse({"reports": list(reports)})

@api_view(['GET'])
def view_report(request):

    report_id = request.GET.get('report_id')
    user_email = request.GET.get('user_email')  
     

    if not report_id:
        return Response({"error": "Report ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if not user_email:
        return Response({"error": "User email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=user_email)
    
        user_groups = user.groups.all() 
        is_authorized = ReportGroup.objects.filter(report_id=report_id, group__in=user_groups).exists()

        if not is_authorized:
            return Response({"error": "You do not have permission to view this report"}, status=status.HTTP_403_FORBIDDEN)

        report = Reports.objects.get(ReportID=report_id)

        sql_query = report.SqlQuery.strip()

        params = [user_email] if "%s" in sql_query else None
        report_data = execute_sql_query(sql_query, params)
        
        return JsonResponse({
            "report_data": report_data, 
            "report_type": report.ReportType.lower(),
            "report_name": report.ReportName
        })
        
    except Reports.DoesNotExist:
        return Response({"error": "Report not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

