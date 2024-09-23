import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stockLevel, setStockLevel] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!name || !price || !stockLevel) {
            setMessage('All fields are required.');
            setLoading(false);
            return;
        }

        const parsedPrice = parseFloat(price);
        const parsedStockLevel = parseInt(stockLevel, 10);

        if (parsedPrice <= 0 || parsedStockLevel < 0) {
            setMessage('Price must be a positive number and stock level cannot be negative.');
            setLoading(false);
            return;
        }

        const newProduct = {
            name,
            price: parsedPrice,
            stock_level: parsedStockLevel
        };

        try {
            const response = await axios.post(`${API_URL}/api/products`, newProduct);
            setMessage('Product added successfully!');
            setName('');
            setPrice('');
            setStockLevel('');
            onProductAdded(response.data.product); // Trigger parent update
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage('Error adding product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: '20px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="product-name"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    id="product-price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="number"
                    id="product-stock-level"
                    placeholder="Stock Level"
                    value={stockLevel}
                    onChange={(e) => setStockLevel(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
            {message && <p style={{ color: loading ? 'orange' : 'red' }}>{message}</p>}
        </div>
    );
};

export default ProductForm;

