import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from reports.models import Reports

# List of reports (replace with actual data)

reports_list = [
                            {
                                'report_name': 'userroles_report',
                                'report_title': 'user roles distribution',
                                'report_type': 'pie chart',
                                'sql_query': '''select r.rolename, count(ur.userroleid) as usercount
from userroles ur
join roles r on ur.roleid = r.roleid
group by r.rolename'''
                            },
    {
                                'report_name': 'emailsettingsstatus',
                                'report_title': 'email settings status',
                                'report_type': 'bar chart',
                                'sql_query': '''select isenabled, count(emailsettingid) as count
from emailsettings
group by isenabled'''
                            },
    {
                                'report_name': 'rolepermissioncount',
                                'report_title': 'role permission count',
                                'report_type': 'doughnut chart',
                                'sql_query': '''select r.rolename, count(rp.rolepermissionid) as permissioncount
from rolepermissions rp
join roles r on rp.roleid = r.roleid
group by r.rolename'''
                            },
    {
                                'report_name': 'usersactivestatus',
                                'report_title': 'users active inactive status',
                                'report_type': 'table chart',
                                'sql_query': '''select isactive, count(userid) as usercount
from users
group by isactive'''
                            },
    {
                                'report_name': 'statusdictionarycount',
                                'report_title': 'status dictionary entries',
                                'report_type': 'line chart',
                                'sql_query': '''select stageclassification, count(statusid) as entrycount
from statusdictionary
group by stageclassification'''
                            }
                        ]

def add_reports_to_admin():
    for report_data in reports_list:
        report, created = Reports.objects.get_or_create(
            ReportName=report_data["report_name"],
            defaults={
                "ReportType": report_data["report_type"],
                "SqlQuery": report_data["sql_query"]
            }
        )

        if created:
            print(f"Report '{report_data['report_name']}' added to Django Admin.")
        else:
            print(f"Report '{report_data['report_name']}' already exists in Django Admin.")

if __name__ == '__main__':
    add_reports_to_admin()
