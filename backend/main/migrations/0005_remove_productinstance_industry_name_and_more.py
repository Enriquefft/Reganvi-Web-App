# Generated by Django 4.2.7 on 2023-12-04 04:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_productindustry'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productinstance',
            name='industry_name',
        ),
        migrations.AddField(
            model_name='productinstance',
            name='industry',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.productindustry'),
        ),
    ]
