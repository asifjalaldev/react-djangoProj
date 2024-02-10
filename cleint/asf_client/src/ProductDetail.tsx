import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate} from 'react-router-dom'
import { getDetail, updateProduct } from './actions/api'

interface params{
  id:string,
}
interface Product{
  id:number,
  name:string,
  price:number,
  image?:string|null,
}

  interface detailProps{
    updateSingle:(product:FormData,id:number)=>void
  }
  // https://www.youtube.com/watch?v=hcDKZRsjGE0&list=PLuHGmgpyHfRx9e7yeOaaL79_L_mBFBHLc&index=18
  export const ProductDetail = ({updateSingle}:detailProps) => {
    const navigate=useNavigate();
    const {id}= useParams<params|any>();
    const [product, setProduct] = useState<Product>();
    const [isEdit, setEdit]=useState(false);
    const [productName, setProductName]=useState('');
    const [productPrice, setproductPrice] = useState(0);
    const [image, setimage] = useState(null);
    const [SelectedFile, setSelectedFile] = useState(null);
    const handleEdit=(id:number)=>{
      setEdit(true);
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setProductName(e.target.value);

    }
    const handlePriceChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setproductPrice(parseInt(e.target.value));
    }
    useEffect(()=>{
      const fetchDetail = async () => {
     try{

       if(id){
         const product=await getDetail(id);
        //  console.log('id: ', id)
         setProduct(product);
         setProductName(product.name);
         setproductPrice(product.price);
         setimage(product.image);
        }else{
          console.log('id not fount');
        }
      } catch(error){
        console.log('error: ', error);
      };
        
    }
    fetchDetail();

  },[id])

const handleRedirect=()=>{
  navigate('/');
}
const handleChangeImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const file = e.target?.files?.[0]
  if(file){
      setimage(URL.createObjectURL(file));
      setSelectedFile(file);
  // console.log(file);
  }else{
  console.log(file);
  }
}
const handleUpdate=(id:number)=>{
  // let product ={} as Product;
  // product.id=id;
  // product.name=productName;
  // product.price=productPrice;
  const formData=new FormData();
  console.log('id', id);
  formData.append('id',id.toString());
  formData.append('name',productName);
  formData.append('price', productPrice.toString());
  if(SelectedFile != null){
  formData.append('image', SelectedFile);
}
const newProd:Product={
  'id':id,
  'name':productName,
  'price': productPrice,
  'image': image,
}
  updateSingle(formData,id);
  setEdit(false); 
  setProduct(newProd);
  console.log(newProd);
}
  return (
   <>
   {product != null ?
   <>
   <h3>Product Detail</h3>
   <table border={2}>
    <thead>
   <tr>
    <th>Product Id</th>
    <th>Product Name</th>
    <th>Product Price</th>
    <th>Product Image</th>
   </tr>
    </thead>
    {
  
     <tr>
  <td>{product.id}</td>
  {isEdit===true? (<>
  <td><input type="text" name="productName" id="" value={productName} onChange={(e)=>{handleChange(e)}}/></td>
  <td><input type="text" name="productPrice" id="" value={productPrice} onChange={(e)=>{handlePriceChange(e)}}/></td>
  <td>
    {image && <img src={image.toString()} alt="" width="150" height="150"/>} <br/>
  <input type="file" name="image" id="" onChange={(e)=>handleChangeImage(e)}/>
  <button>change</button>
  </td>
  
  </>):(

    <>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.image && <img src={product.image} alt="" width="150" height="150"/>}</td>

    </>
  )}
 {isEdit===true?(  
  <>
  <td><button onClick={()=>handleUpdate(product.id)}>Update</button></td>
  </>
  ):(   
  <td><button onClick={()=>handleEdit(product.id)}>Edit</button></td>)}
  </tr>

    }
    
   </table>
    </> : 
   <>
   <h3>product not found</h3> <p></p>
   </>
   }
   <div>
    <button onClick={handleRedirect}>Go Back</button>
   </div>
   </>
  )
}



// ------------------------

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
// import { getDetail } from './actions/api';

// interface Product{
//   id:number,
//   name:string,
//   price:number,
// }
// export const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product>();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (id) {
//           const response = await getDetail(id);
//           setProduct(response);
//           setIsLoading(false);
//         }
//       } catch (error) {
//         console.log('Error fetching product detail:', error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   return (
//     <>
//       <h3>Product Detail</h3>
//       {isLoading ? (
//         <p>Loading product details...</p>
//       ) : product ? (
//         <table border={2}>
//           <tr>
//             <th>Product Id</th>
//             <th>Product Name</th>
//             <th>Product Price</th>
//           </tr>
//           <tr>
//             <td>{product.id}</td>
//             <td>{product.name}</td>
//             <td>{product.price}</td>
//           </tr>
//         </table>
//       ) : (
//         <p>No product data available.</p>
//       )}
//       <div>
//         <Link to={'/'}>Go Back</Link>
//       </div>
//     </>
//   );
// };
