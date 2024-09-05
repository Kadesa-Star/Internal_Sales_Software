// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
	const [products, setProducts] = useState([]);
	const [name, setName] = useState('');
	const [stockLevel, setStockLevel] = useState('');

	useEffect(() => {
		axios.get('/api/products')
			.then(response => setProducts(response.data))
			.catch(error => console.error(error));
	}, []);
	const addProduct = () => {
		axios.post('/api/products', { name, stock_level: stockLevel })
			.then(response => {
				setProducts([...products, { name, stock_level: stockLevel }]);
				setName('');
				setStockLevel('');
			})
			.catch(error => console.error(error));
	};

  return (
	  <div>
	  <h1>Product Management</h1>
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
	  />
	  <button onClick={addProduct}>Add Product</button>
	  <ul>
	  	{products.map((product, index) => (
			<li key={index}>{product.name} - {product.stock_level}</li>
		))}
	  </ul>
	  </div>
  );
};

export default ProductManagement;
