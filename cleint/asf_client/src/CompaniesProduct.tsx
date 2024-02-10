import { getCompaniesProducts } from './actions/api2'
import {useState, useEffect} from 'react'
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

export const CompaniesProduct = () => {
  const [Company, setCompany] = useState<Companies[]>()
  useEffect(() => {
    getCompaniesProducts()
    .then((res)=>{
      setCompany(res)
      console.log(res)
    }
      )
  }, [])
  
  return (
    <>
    <div>CompaniesProduct</div>
      {Company && Company.map((com) =>
       ( <>
        <h3 key={com.name}>{com.name}</h3>
        <table border={1}>      
          <tr><td>Name</td><td>Price</td><td>Images</td></tr>
            {com.products.map((product)=>(
            <tr>
              <td>{product.name}</td>
              <td>{product.price}</td>
             {product.images.map((url)=>(
             
              <td><img src={"http://localhost:8000/"+url.image} alt="" width={150} height={155}/></td>
              
              ))}
            </tr>
            
            
            ))}
        </table>
        </>
        )
      )}
    </>
  )
}
