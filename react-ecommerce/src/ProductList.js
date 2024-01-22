import React, {useEffect, useState} from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


const ProductList = () => {
    const [products, setProduct] = useState([])

    useEffect(() => {
        axios.get('/products')
        .then(
            response => {
                setProduct(response.data)
            }
        ).catch(error => {
            console.error("There was an error retrieving the products: ", error);
        })
    }, [])

    const deleteProduct = (productId) => {
        axios.delete(`/products/${productId}`)
        .then(() => {
            setProduct(products.filter(product => product.id!==productId));
        })
        .catch(error => {
            console.error("There was an error deleting the product: ",error);
        })
    };

    return (
        <>
        
        <div className="card">
              <div className="card-header">
              <h3 className='product-list-title'>Product List
                <Link to={'/add'} className='btn btn-primary float-end'>Create</Link>
              </h3>
              </div>
              <div className='card-body'>
            

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {products.map(product => (
    <tr key={product.id} >
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <Link className='btn btn-primary' to={`/edit/${product.id}`}><i className='bi bi-pencil'></i></Link>
        <button className='btn btn-danger' onClick={() => deleteProduct(product.id)}><i className='bi bi-trash'></i></button>
      </td>
    </tr>
            ))}
  </tbody>
</table>
   
</div>
            </div>

        </>
    );
}

export default ProductList;