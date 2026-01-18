from django.db import models
from django.contrib.auth.models import Group

class Reports(models.Model):
    ReportID = models.AutoField(primary_key=True)
    ReportName = models.CharField(max_length=100)
    SqlQuery = models.TextField()
    REPORT_TYPE_CHOICES = [
        ('pie chart', 'Pie Chart'),
        ('bar chart', 'Bar Chart'),
        ('line chart', 'Line Chart'),
        ('doughnut chart', 'Doughnut Chart'),
        ('table chart', 'Table Report'),
    ]
    ReportType = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES)

    class Meta:
        db_table = 'Reports_Table'
        verbose_name_plural = 'Reports'

    def __str__(self):
        return self.ReportName
    
class ReportGroup(models.Model):
    report = models.ForeignKey(Reports, on_delete=models.CASCADE)  
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  

    class Meta:
        db_table = 'Report_Groups_Table'
        unique_together = ('report', 'group')  
        verbose_name_plural = 'Report Groups'

    def __str__(self):
        return f"{self.group.name} - {self.report.ReportName}"