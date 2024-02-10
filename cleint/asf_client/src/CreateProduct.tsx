
import { useState } from 'react';
import {createData} from './actions/api'
interface Product{
    id:number|null,
    name:string,
    price:number,
    image?:string|null,
}

interface ProductProps{
    updateProduct:(newProduct: Product)=>void;
}

export const CreateProduct = ({updateProduct}:ProductProps) => {

    const [product, setProduct]=useState<Product>({id:0,name:'', price:0, image: null})
    const [image, setimage] = useState<File|null>(null);
    const [imageURL, setimageURL] = useState(null);
    const handleChange=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
       const {name, value}=e.target;
       const newProduct={...product,[name]:value};
        setProduct(newProduct);
        console.log('new product inside handle change: ',newProduct);
    }
    const handleChangeImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target?.files?.[0]
        if(file){
            setimage(file);
            setProduct({...product,image:file});
            setimageURL(URL.createObjectURL(file));
        console.log(file);
        
        }else{
        console.log(file);
        }
    }
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        if(product.image){
        formData.append('image', product.image);
        }else{
        console.log('image is null: ', product.image);
        }
        
        createData(formData)
        .then((response:string)=>{
            console.log('product created:', response);
            // product.image=image;
        
            updateProduct(product, imageURL);
            setimageURL(null);
            setimage(null);
        }).catch(error=>{console.log(error)})
        setProduct({
            id:0,
            name:'',
            price:0.0,
            image:undefined,
        })
    }

  return (
    <div>
        <h3>CreateProduct</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder='Enter Product Name ' id='name' name='name' value={product.name} onChange={handleChange}/>
            <input type="text" placeholder='Enter Product price ' id='price' name='price' value={product.price.toString()} onChange={handleChange}/>
            {imageURL && <img src={imageURL} width={200} height={200}/>}
            <input type="file" name="image" id="" onChange={(e)=>handleChangeImage(e)}/>
            <button type="submit" >Create</button>
        </form>
        
    </div>

  )
}
