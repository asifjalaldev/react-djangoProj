import axios from 'axios'


interface ProductImage {
    image: string; // You can use string as the type if image_url is a URL string
  }
  
  interface Product{
    id: number;
    name: string;
    price: number;
    images: ProductImage[];
  }
const API_BASE_URL= 'http://127.0.0.1:8000/'

export const fetchData=():Promise<any[]>=>{
    const apiUrl =`${API_BASE_URL}`;
    return axios.get<Product[]>(apiUrl)
    .then((response) => response.data)
    .catch(error => {
        throw error;
    });
};

export const createData=(data:FormData)=>{
    const apiUrl=`${API_BASE_URL}`;
    console.log(data);
    return axios.post(apiUrl, data)
    .then(response =>response.data)
    .catch(error => {
        throw error;
    });
};

export const getDetail=(id:string)=>{
    const product_id:number=parseInt(id);
    const apiUrl=`${API_BASE_URL}/${product_id}/`;
    console.log('getting param: ',product_id);
    return axios.get<Product[]>(apiUrl)

    .then(response => response.data)
    .catch(error =>{
        console.log('error fetching the details', error)
        throw error;});
}

export const deleteProduct=(id:number)=>{

    const apiUrl=`${API_BASE_URL}/delete/${id}/`
    return axios.delete(apiUrl)
    .then(response=>response.data)
    .catch(error=>{throw error});
}

export const updateProduct=(product:FormData,id:number)=>{
    console.log('in api call id: ', id);
    const apiUrl=`${API_BASE_URL}/update/${id}`
    // axios.get(apiUrl)
    return axios.put(apiUrl, product)
    .then(response => response.data )
    .catch(error =>{
        console.log('error updating  the product', error)
        throw error;});
}