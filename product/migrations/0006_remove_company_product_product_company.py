# Generated by Django 4.2.5 on 2023-10-27 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_company_delete_productimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='product',
        ),
        migrations.AddField(
            model_name='product',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='product.company'),
        ),
    ]
