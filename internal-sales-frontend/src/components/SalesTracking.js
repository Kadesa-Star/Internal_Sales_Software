import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesTracking = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setMessage('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [API_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!productId || !quantitySold || quantitySold <= 0) {
            setMessage('Please select a product and enter a valid quantity sold.');
            return;
        }

        const saleData = { product_id: productId, quantity_sold: parseInt(quantitySold, 10) };

        setSubmitting(true);

        try {
            await axios.post(`${API_URL}/api/sales`, saleData);
            setMessage('Sale recorded successfully!');
            setProductId('');
            setQuantitySold('');
        } catch (error) {
            console.error('Error recording sale:', error);
            setMessage('Error recording sale.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Sales Tracking</h2>
            {loading && <p>Loading products...</p>}
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="product-select">Product:</label>
                <select
                    id="product-select"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                >
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="quantity-sold">Quantity Sold:</label>
                <input
                    type="number"
                    id="quantity-sold"
                    value={quantitySold}
                    onChange={(e) => setQuantitySold(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Recording...' : 'Record Sale'}
                </button>
            </form>
        </div>
    );
};

export default SalesTracking;

