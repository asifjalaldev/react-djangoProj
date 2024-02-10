from django.db import models

# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

    # image=models.ImageField(upload_to=upload_to, default=None, null=True)
    
class Company(models.Model):
    name=models.CharField(max_length=50)
    def __str__(self):
        return self.name
# Create your models here.
class Product(models.Model):
    ProductName=models.CharField(max_length=50)
    price=models.DecimalField(max_digits=40, decimal_places=2)
    company=models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, related_name='company')
    def __str__(self):
        return self.name
    
class ProductImages(models.Model):
    product=models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product')
    image=models.ImageField(upload_to=upload_to, default=None, null=True)