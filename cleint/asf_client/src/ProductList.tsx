


import { Link } from "react-router-dom";
interface ProductImage {
  image: string; // You can use string as the type if image_url is a URL string
}

interface Product {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
}

interface ProductProps{
 products:Product[];
 onDeleteProduct:(id:number)=>void
}

export default function ProductList({products, onDeleteProduct}:ProductProps) {
   
          // const [data, setdata] = useState<Product[]>([]);
         
          const handleDelete=(id:number)=>{
            onDeleteProduct(id);
        
        }
  return (
    <>
    <h3>ProductList</h3>
    <ul>
{/* <p key={product.id}>{product.name}: price: {product.price}</p> */}
   <table border={1}>
   <tr>
    <th>Product Name</th>
    <th>Product Price</th>
    <th>Product image</th>
    <th>Action</th>
   </tr>
  {products.map((product)=>(
   <tr key={product.id}>
      <td><Link to={`/product/${product.id}`}>{product.name}</Link></td>

    <td>{product.price}</td>

    <td>{product.images && product.images.map((img)=>(<img src={"http://localhost:8000/"+img.image} alt={img.image} width="150" height="150"/>))}</td>
    <td><button onClick={()=>{handleDelete(product.id)}}>Delete</button></td>
   </tr>
  ))}
  </table>
</ul>
</>
  )
}
