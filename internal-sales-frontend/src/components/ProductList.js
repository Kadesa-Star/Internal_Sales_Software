import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [API_URL]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Error deleting product. Please try again.');
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && products.length === 0 && <p>No products available.</p>}
            {!loading && !error && products.length > 0 && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {products.map(product => (
                        <li key={product.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                            {product.name} - ${product.price} - {product.stock_level} units
                            <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;

