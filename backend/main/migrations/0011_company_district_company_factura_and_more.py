# Generated by Django 4.2.7 on 2024-02-04 03:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_rename_member_contact_email_companyinfo_contact_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='district',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='factura',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='productcategory',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='productinstance',
            name='available_quantity',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField(blank=True, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('is_public', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.company')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CotizationLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_type', models.CharField(choices=[(1, 'bulk'), (2, 'pressed'), (3, 'ground'), (4, 'raw'), (5, 'all')], max_length=50)),
                ('quantity', models.IntegerField()),
                ('unit_of_measure', models.CharField(choices=[('KG', 'Kilogram'), ('TON', 'Ton'), ('G', 'Gram'), ('LB', 'Pound'), ('L', 'Liter'), ('ML', 'Milliliter'), ('M3', 'Cubic Meter'), ('CM3', 'Cubic Centimeter'), ('EA', 'Each'), ('DOZ', 'Dozen'), ('M', 'Meter'), ('CM', 'Centimeter'), ('INCH', 'Inch')], max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]