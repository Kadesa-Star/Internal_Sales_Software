import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesTracking = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [message, setMessage] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        axios.get(`${API_URL}/api/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching products!', error);
            });
    }, [API_URL]);

    const handleSaleSubmit = (e) => {
        e.preventDefault();

        if (!productId || !quantitySold || isNaN(quantitySold) || quantitySold <= 0) {
            setMessage('Please select a product and enter a valid quantity');
            return;
        }

        const saleData = {
            product_id: productId,
            quantity_sold: parseInt(quantitySold, 10),
        };

        axios.post(`${API_URL}/api/sales`, saleData)
            .then(response => {
                setMessage(response.data.message);
                setProductId('');
                setQuantitySold('');
            })
            .catch(error => {
                console.error('There was an error recording the sale!', error);
                setMessage('Error recording sale');
            });
    };

    return (
        <div>
            <h2>Sales Tracking</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSaleSubmit}>
                <div>
                    <label htmlFor="product">Product:</label>
                    <select
                        id="product"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity Sold:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantitySold}
                        onChange={(e) => setQuantitySold(e.target.value)}
                    />
                </div>
                <button type="submit">Record Sale</button>
            </form>
        </div>
    );
};

export default SalesTracking;

