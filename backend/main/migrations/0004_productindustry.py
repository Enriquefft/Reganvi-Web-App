# Generated by Django 4.2.7 on 2023-12-04 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_product_productcategory_productinstance_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductIndustry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
    ]
