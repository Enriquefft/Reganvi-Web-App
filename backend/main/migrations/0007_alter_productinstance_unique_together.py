# Generated by Django 4.2.7 on 2023-12-04 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_productinstance_industry_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='productinstance',
            unique_together={('name', 'company')},
        ),
    ]
