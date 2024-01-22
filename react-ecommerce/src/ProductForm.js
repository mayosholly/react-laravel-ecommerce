import React, {useState, useEffect} from "react";
import axios  from "./axios";

import { useParams, useNavigate } from "react-router-dom";

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name : '',
        description : '',
        price : '',
    });
    const [errors, setErrors] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(id) {
            axios.get(`/products/${id}`)
            .then(response => {
                setFormData(response.data)
            })
            .catch(error => console.error('Error fetching the product: ', error))
        }
    }, [id]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]:value })
        setErrors({...errors, [name]: ''})
    };

    const validateForm = () => {
        let tempErrors = {};
        if(!formData.name) tempErrors.name = 'Name is required';
        if(!formData.description) tempErrors.description = 'description is required';
        if(!formData.price) tempErrors.price = 'price is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!validateForm()) return 
        try {
            if(id){
                await axios.put(`/products/${id}`, formData)
            }else{
                await axios.post('/products', formData);
            }
            navigate('/');
        } catch (error) {
            console.error("Error Submitting form: ", error);
        }        
    };

    return (

<div className="card">
              <div className="card-header">
              <h3 className='product-list-title'>Add Product
              </h3>
              </div>
              <div className='card-body'>

        <form onSubmit={handleSubmit} >
        <div class="mb-3">
            <label className="form-control">
                Name: 
                <input className="form-control" type="text" name="name" value={formData.name} onChange={handleInputChange} />
                {errors.name && <div className="error">{errors.name}</div>}
            </label>
        </div>

        <div class="mb-3">
            <label className="form-control">
                Description: 
                <textarea name="description" className="form-control" value={formData.description} onChange={handleInputChange} />
                {errors.description && <div className="error">{errors.description}</div>}
            </label>
    </div>

    <div class="mb-3">
            <label className="form-control">
                Price: 
                <input type="text" name="price" className="form-control" value={formData.price} onChange={handleInputChange} />
                {errors.price && <div className="error">{errors.price}</div>}
            </label>
        </div>
        
            <button className="btn btn-primary form-control"  type="submit">Submit</button>
        </form>
        </div>
        </div>
    )
}

export default ProductForm;

