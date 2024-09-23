import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setMessage('Error fetching products.');
            }
        };
        fetchProducts();
    }, [API_URL]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
            setMessage('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage('Error deleting product.');
        }
    };

    const handleProductAdded = (newProduct) => {
        setProducts(prevProducts => {
            const existingProduct = prevProducts.find(product => product.id === newProduct.id);
            if (existingProduct) {
                return prevProducts.map(product =>
                    product.id === newProduct.id
                        ? { ...product, stock_level: newProduct.stock_level }
                        : product
                );
            } else {
                return [...prevProducts, newProduct];
            }
        });
        setMessage('Product added successfully!');
    };

    return (
        <div>
            <h1>Product Management</h1>
            <Link to="/products">View Products</Link>
            {message && <p>{message}</p>}
            <ProductForm onProductAdded={handleProductAdded} />

            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} - {product.stock_level} units
                        <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;

