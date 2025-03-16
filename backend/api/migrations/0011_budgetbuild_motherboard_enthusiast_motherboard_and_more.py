# Generated by Django 5.1.6 on 2025-03-16 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_enthusiast_cabinet_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='budgetbuild',
            name='motherboard',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='enthusiast',
            name='motherboard',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='gamingbuilds',
            name='motherboard',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='professional',
            name='motherboard',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='workstations',
            name='motherboard',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
