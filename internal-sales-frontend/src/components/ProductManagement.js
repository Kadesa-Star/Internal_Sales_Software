import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const [editProductId, setEditProductId] = useState(null); // For tracking the product to edit
    const [stockLevel, setStockLevel] = useState('');
    const [price, setPrice] = useState('');
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

    const handleUpdateProduct = async (id) => {
        try {
            const data = {
                stock_level: stockLevel,
                price: price
            };
            await axios.put(`${API_URL}/api/products/${id}`, data);
            setProducts(products.map(product =>
                product.id === id
                    ? { ...product, stock_level: data.stock_level, price: data.price }
                    : product
            ));
            setMessage('Product updated successfully!');
            setEditProductId(null);
            setStockLevel('');
            setPrice('');
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage('Error updating product.');
        }
    };

    const handleEditClick = (product) => {
        setEditProductId(product.id);
        setStockLevel(product.stock_level);
        setPrice(product.price);
    };

    return (
        <div>
            <h1>Product Management</h1>
            <Link to="/products">View Products</Link>
            {message && <p>{message}</p>}
            <ProductForm onProductAdded={newProduct => setProducts([...products, newProduct])} />

            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} - {product.stock_level} units
                        <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                        <button onClick={() => handleEditClick(product)} style={{ marginLeft: '10px' }}>
                            Update
                        </button>
                    </li>
                ))}
            </ul>

            {editProductId && (
                <div>
                    <h2>Update Product</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(editProductId); }}>
                        <div>
                            <label>Stock Level:</label>
                            <input
                                type="number"
                                value={stockLevel}
                                onChange={(e) => setStockLevel(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Update Product</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
