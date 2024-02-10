import axios from "axios"
interface ProductImage {
    image: string; // You can use string as the type if image_url is a URL string
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
    images: ProductImage[];
  }
  
  interface Companies {
    name: string;
    products: Product[];
  }
export const getCompaniesProducts=()=>{
const url='http://localhost:8000/companies/';
const apiUrl =`${url}`;

return axios.get<Companies[]>(apiUrl)
.then((res)=>{return res.data})
.catch(error=>{throw error})
}