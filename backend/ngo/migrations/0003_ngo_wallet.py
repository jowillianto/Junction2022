# Generated by Django 4.0 on 2022-08-20 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ngo', '0002_ngo_staff'),
    ]

    operations = [
        migrations.AddField(
            model_name='ngo',
            name='wallet',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
