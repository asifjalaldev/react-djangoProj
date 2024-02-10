from rest_framework import serializers
from .models import Product, Company, ProductImages
class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductImages
        fields = ('image',)
class ProductSerializer(serializers.ModelSerializer): 
    company=serializers.SlugRelatedField(read_only=True, slug_field='name')
    images=serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields=('id', 'ProductName', 'price','company', 'images')
    def get_images(self,obj):
        images=ProductImages.objects.select_related('product').filter(product=obj)
        # return [image for image in images]
        serialize_images=ProductImagesSerializer(images, many=True)
        return serialize_images.data

class CompanySerializer(serializers.ModelSerializer):
    products=serializers.SerializerMethodField()
    class Meta:
        model=Company
        fields=('name','products')
    def get_products(self,obj):
        products=Product.objects.select_related('company').filter(company=obj)
        # return [ProductSerializer(product) for product in products]
        product_serializer = ProductSerializer(products, many=True)
        return product_serializer.data
        