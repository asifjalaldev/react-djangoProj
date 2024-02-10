
import './App.css'
import ProductList from './ProductList'
import { CreateProduct } from './CreateProduct'
import { useEffect, useState } from 'react'
import { fetchData,updateProduct as updateSingleProductapi } from './actions/api';
import {deleteProduct} from "./actions/api"
import { Routes, Route } from 'react-router';
import { ProductDetail } from "./ProductDetail";
import {getCompaniesProducts} from "./actions/api2"
import { CompaniesProduct } from './CompaniesProduct';
interface Product{
  id:number,
  name:string,
  price:number,
  image?:string|null,
}

function App() {
  
const [products, setproducts] = useState<Product[]>([]);
const updateProduct=(newProduct:Product, imageUrl:string)=>{
  newProduct.image=imageUrl;
  setproducts([...products, newProduct]);

}
const handleDeleteProduct=(id:number)=>{
  deleteProduct(id)
  .then(()=>{
    setproducts((products)=>products.filter((product:Product)=>product.id!==id))
  })
  .catch((error) => {
    console.error('Error deleting product:', error);
  });
}
const updateSingleProduct=(product:FormData,id:number)=>{
  // console.log('befor api call id: ', id);
  updateSingleProductapi(product, id)
  .then((response)=>{response.data
    console.log('update from app is called: ', product)
  const updatedProductList=products.map((item)=>{
    if(item.id==id){
      const image=product.get('image') as Blob|null;
     if(image !== null){
      const imageUrl=URL.createObjectURL(image);
      return {...item, name:product.get('name'), price:product.get('price'), image:imageUrl}
    }else{
      return {...item, name:product.get('name'), price:product.get('price')}

    }
    }
    return item
  });

  setproducts(updatedProductList);
})
.catch(error=>{console.log('error put request: ', error)})
}
useEffect(() => {
  fetchData()
  .then(products=>{
      setproducts([...products, products]);

  })
.catch(error =>{
  console.error('Error fetching data: ', error);
})

}, [])

  return (
    <>
    <Routes>
      <Route path='/' element={<>
    <p>hello world</p>
    <CreateProduct updateProduct={updateProduct}/>
    <ProductList products={products} onDeleteProduct={handleDeleteProduct}/>
    <CompaniesProduct/>
      </>
    }/>
      <Route path='/product/:id' element={<ProductDetail updateSingle={updateSingleProduct}/>}/>

    </Routes> 
    </>
  )
}

export default App
