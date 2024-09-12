import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [stockLevel, setStockLevel] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        axios.get(`${API_URL}/api/products`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
                setMessage({ text: 'Error fetching products.', type: 'error' });
            });
    }, [API_URL]);

    const addProduct = () => {
        if (!name || !stockLevel || isNaN(stockLevel) || stockLevel <= 0) {
            setMessage({ text: 'Please provide a valid product name and stock level.', type: 'error' });
            return;
        }

        const newProduct = { name, stock_level: parseInt(stockLevel, 10) };

        axios.post(`${API_URL}/api/products`, newProduct)
            .then(response => {
                setProducts([...products, response.data.product]);
                setName('');
                setStockLevel('');
                setMessage({ text: 'Product added successfully!', type: 'success' });
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setMessage({ text: 'Error adding product.', type: 'error' });
            });
    };

    const deleteProduct = (id) => {
        axios.delete(`${API_URL}/api/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
                setMessage({ text: 'Product deleted successfully!', type: 'success' });
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                setMessage({ text: 'Error deleting product.', type: 'error' });
            });
    };

    return (
        <div>
            <h1>Product Management</h1>

            {message.text && (
                <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>
                    {message.text}
                </p>
            )}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.stock_level}
                            <button onClick={() => deleteProduct(product.id)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Product Name"
            />
            <input
                type="number"
                value={stockLevel}
                onChange={e => setStockLevel(e.target.value)}
                placeholder="Stock Level"
            />
            <button onClick={addProduct}>Add Product</button>
        </div>
    );
};

export default ProductManagement;

