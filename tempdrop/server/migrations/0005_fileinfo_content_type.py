# Generated by Django 3.0.7 on 2020-07-10 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_auto_20200630_0202'),
    ]

    operations = [
        migrations.AddField(
            model_name='fileinfo',
            name='content_type',
            field=models.TextField(default=''),
        ),
    ]
