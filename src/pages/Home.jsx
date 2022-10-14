import React from 'react'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import headset from '../assets/headset.jpg';
import './pages.css';
import { get } from '../api/http.service';

/**
 * Limit per page
 */
const perPage = 8;

const Home = () => {
    
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    /**
     * Product list
     */
    const [products, setProducts] = useState([]);

    /**
     * Total products
     */
    const [total, setTotal] = useState(0);

    /**
     * Current page
     */
    const [page, setPage] = useState(1);

    /**
     * Total pages
     */
    const [pages, setPages] = useState(1);

    /**
     * Next
     */
    function loadNext() {
        loadProduct(page + 1);
    }

    /**
     * Prev
     */
    function loadPrev() {
        loadProduct(page - 1)
    }

    function openDetails(product) {
        navigate(`/${product._id}`, {state: {product}})
    }

    /**
     * 
     * @param {*} page 
     */
    const loadProduct = (page = 1) => {
        setLoading(true);
        get(`products?limit=${perPage}&page=${page}`)
        .then(res => {
            let data = res.data.data;
 
            setPage(data.page);
            setProducts(data.data);
            setTotal(data.total);
            setPages(Math.ceil(data.total / perPage));

            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            alert(e.message || 'Operation not succeeded');
        })
    }

    useEffect(() => {
      loadProduct()
    }, [])

    return (
        <div className="container py-3">

            {
                (loading) 
                ?
                <div className='text-center text-success py-3'>
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                ''
            }
            
            <h4 className='mb-0'>Products</h4>
            <p className='small text-muted mb-4'>There are {total} Products Available</p>
            <div className="row">
               {
                products.map((product, index) => {
                    return (
                        <div className="col-md-3 mb-4 pointer" key={index} onClick={() => openDetails(product)}>
                            <div className="card border-0 bg-light">
                                <img src={headset} className="card-img-top" alt="Product" />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {product.product_name_lenght}
                                    </h5>

                                    {/* Placeholder */}
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                </div>
                            </div>
                        </div>
                    )
                })
               }
            </div>

            {
                products.length
                ?
                <nav className='text-center justify-content-center'>
                    <ul className="pagination text-center">
                        <li className="page-item">
                            <button onClick={loadPrev} className='page-link' disabled={page === 1}>Prev</button>
                        </li>
                        <li className="page-item">
                        <button onClick={loadNext} className='page-link' disabled={page === pages}>Prev</button>
                        </li>
                    </ul>
                </nav>
                :
                ''
            }

        </div>
    );
}

export default Home;