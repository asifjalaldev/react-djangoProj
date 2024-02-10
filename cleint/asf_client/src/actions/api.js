import axios from 'axios'


const API_BASE_URL= 'http://127.0.0.1:8000'

export const fetchData=()=>{
    const apiUrl =`${API_BASE_URL}`;
    return axios.get(apiUrl)
    .then(response => response.data)
    .catch(error => {
        throw error;
    })
}

// create new instance 
export const createData=(data)=>{
    const apiUrl=`${API_BASE_URL}`;
    return axios.post(apiUrl, data)
    .then(response =>response.data)
    .catch(error => {
        throw error;
    })
}
export const deleteProduct=(id)=>{
    const apiUrl=`${API_BASE_URL}/delete/${id}/`
    return axios.delete(apiUrl)
    .then(response=>response.data)
    .catch(error=>{ throw error});
}
export const getDetail=(id)=>{
    const apiUrl=`${API_BASE_URL}/${id}/`
    console.log('getDetail is called. id = ', id)
    return axios.get(apiUrl)
    .then(response => response.data )
    .catch(error =>{
        console.log('error fetching the details', error)
        throw error;});
}

export const updateProduct=(product,id)=>{
    console.log('in api call id: ', id);
    const apiUrl=`${API_BASE_URL}/update/${id}`
    console.log(product);
    console.log(apiUrl);
    return axios.put(apiUrl, product)
    .then(response => response.data )
    .catch(error =>{
        console.log('error fetching the details', error)
        throw error;});
}