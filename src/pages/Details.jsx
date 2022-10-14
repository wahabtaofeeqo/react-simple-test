import headset from '../assets/headset.jpg';
import './pages.css';

import { useLocation, useNavigate } from "react-router-dom";
import { del } from '../api/http.service';

const Details = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state.product;

    const doDelete = () => {
        const option = window.confirm('Delete product?');
        if(option) {
            del(`products/${product._id}`)
            .then(res => {
                alert(res.data.message);
                navigate(-1);
            })
            .catch(e => {
                alert(e.message || 'Operation not suceeded')
            })
        }
    }

    const openEdit = () => {
        navigate(`/${product._id}/edit`, {state: {product}})
    }
    
    return (
        <>
            <div className="container py-3">
                <h4 className='mb-4'>Product Details</h4>
                <div className="row">
                    <div className="col-6 img-details-wrapper">
                        <img src={headset} alt="Product " />
                    </div>
                    <div className="col-6">
                        <h5 className="card-title mb-4">
                            {product.product_name_lenght}
                        </h5>

                        {/* Just a placeholder */}
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Vero dolor sequi quis provident modi quidem. Sit adipisci nostrum dicta. 
                            Debitis obcaecati non recusandae ullam perspiciatis illo vitae veniam libero 
                            molestias.
                        </p>

                        <div className='py-3'>
                            <button className='btn btn-info me-3' onClick={openEdit}>Edit Product</button>
                            <button className='btn btn-danger' onClick={doDelete}>Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details;