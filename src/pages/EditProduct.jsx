import './pages.css';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {put} from '../api/http.service';

const EditProduct = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state.product;

    /**
     * Form state
     */
    let [form, setform] = useState({
        name: product.product_name_lenght,
        desc: product.product_description_lenght,
        weight: product.product_weight_g,
        price: 0
    });
    
    /**
     * Input Change handler
     * 
     * @param {*} value 
     * @param {*} field 
     */
    const updateForm = (value, field) => {
        form[field] = value;
        setform(form)
    }

    /**
     * Form Handler
     * 
     * @param {*} e 
     */
    const doSubmit = (e) => {
        e.preventDefault();
        put(`products/${product.product_id}`, form)
        .then(res => {
            alert(res.data.message);
            navigate(-1, {state: res.data.data});
        })
        .catch(e => {
            alert(e.message || 'Operation not succeeded');
        })
    }

    return (
        <>
            <div className='container py-3'>
               <div className='col-md-6 mx-auto'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4 className='mb-3'>Update Product</h4>

                            <form onSubmit={doSubmit}>
                                <div className='mb-4'>
                                    <label>Name</label>
                                    <input type="text" defaultValue={form?.name || ''} onChange={(e) => updateForm(e.target.value, 'name')} className='form-control' />
                                </div>

                                <div className='mb-4'>
                                    <label>Price</label>
                                    <input type="text" defaultValue={form?.price || 0} onChange={(e) => updateForm(e.target.value, 'price')}  className='form-control' />
                                </div>

                                <div className='mb-4'>
                                    <label>Weight</label>
                                    <input type="text" defaultValue={form?.weight || 0} onChange={(e) => updateForm(e.target.value, 'weight')}  className='form-control' />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor="">Description</label>
                                    <textarea defaultValue={form?.desc || ''} className='form-control' onChange={(e) => updateForm(e.target.value, 'desc')}  rows="5"></textarea>
                                </div>

                                <button className='btn btn-danger px-5'>Update</button>
                            </form>
                        </div>
                    </div>
               </div>
            </div>
        </>
    )
}

export default EditProduct;