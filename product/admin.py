from django.contrib import admin
from .models import Product,Company, ProductImages
# Register your models here.
admin.site.register(Company)
admin.site.register(Product)
admin.site.register(ProductImages)
