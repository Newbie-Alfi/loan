# Generated by Django 4.2.7 on 2023-11-24 22:44

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("credit_application", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="creditapplication",
            name="allow_credit",
            field=models.BooleanField(blank=True, default=None, null=True),
        ),
    ]
