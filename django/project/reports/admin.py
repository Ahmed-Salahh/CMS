from django.contrib import admin
from .models import *
from unfold.admin import ModelAdmin

@admin.register(Reports)
class ReportsAdmin(ModelAdmin):
    list_display = ('ReportID','ReportName','ReportType')
    search_fields = ('ReportName','ReportType',)

@admin.register(ReportGroup)
class ReportGroupAdmin(ModelAdmin):
    list_display = ('report','group')
    search_fields = ('report','group',)