# Generated by Django 4.2.5 on 2023-10-16 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(default=None, null=True, upload_to=''),
        ),
    ]
