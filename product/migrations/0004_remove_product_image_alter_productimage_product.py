# Generated by Django 4.2.5 on 2023-10-25 13:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_alter_product_image_productimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
        migrations.AlterField(
            model_name='productimage',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product', to='product.product'),
        ),
    ]