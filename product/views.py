from .models import Company, Product, ProductImages
from rest_framework import generics
from .serializers import ProductSerializer,CompanySerializer, ProductImagesSerializer
# Create your views here.
class ListProducts(generics.ListAPIView):
    serializer_class=CompanySerializer
    queryset=Company.objects.all()

listProducts=ListProducts.as_view()

class ListProductImage(generics.ListCreateAPIView):
    queryset=ProductImages.objects.all()
    serializer_class=ProductImagesSerializer
    def get_queryset(self):
        product_id=self.kwargs['product_id']
        return ProductImages.objects.filter(product_id = product_id)
    def perform_create(self, serializer):
        product_id=self.kwargs['product_id']
        product=Product.objects.get(id=product_id)
        serializer.validated_data['product'] = product  # Set the product field on the serializer
        serializer.save()
        # return super().perform_create(serializer)

class CreateListProduct(generics.ListCreateAPIView):
    # parser_classes=(MultiPartParser,)
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    
   
createListProducts=CreateListProduct.as_view()

class GetDetailProduct(generics.RetrieveAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    lookup_field='pk'

getProductDetail=GetDetailProduct.as_view()
class UpdateDetailProduct(generics.UpdateAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    lookup_field='pk'
update_detailProduct = UpdateDetailProduct.as_view()

class DeleteProduct(generics.DestroyAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    lookup_field='pk'
deleteProduct = DeleteProduct.as_view()
