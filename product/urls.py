from django.urls import path, re_path

from . import views
urlpatterns = [
path('', views.createListProducts, name='create-list-products'),
path('<int:pk>/', views.getProductDetail, name='get-detail'),
path('update/<int:pk>', views.update_detailProduct, name='update-product'),
path('delete/<int:pk>/', views.deleteProduct, name='delete-product'),

path('companies/',views.listProducts, name='products'),
# path('ProductImages/', views.ListProductImage.as_view()),
# re_path(r'^products/(?P<product_id>\d+)/images/$',views.ListProductImage.as_view(), name='image-list'),
 path('products/<int:product_id>/images/', views.ListProductImage.as_view(), name='image-list'),



]
