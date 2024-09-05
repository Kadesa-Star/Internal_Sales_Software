// src/components/SalesTracking.js
import Reacti, { useState, useEffect } from 'react';
import axios from 'axios';


const SalesTracking = () => {
	// State to hold products and sale data
	const [products, setProducts] = useState([]);
	const [productId, setProductId] = useState('');
	const [quantitySold, setQuantitySold] = useState('');
	const [message, setMessage] = userState('');

	// Fetch products from backend
	useEffect(() => {
		axios.get('http://localhost:5000/api/products')
			.then(response => {
				setProducts(response.data);
			})
			.catch(error => {
				console.error('There was an error fetching products!', error);
			});
	}, []);

	// Handle form submit for recording sale
	const handleSaleSubmit = (e) => {
		e.preventDefault();

		// Validate the inputs
		if (!productId || !quantitySold) {
			setMessage('Please select a product and enter a quantity');
			return;
		}

		// Prepare the sale data
		const saleData = {
			product_id: productId,
			quantity_sold: parseInt(quantitySold, 10),
		};

		// Send the sale data to the backend
		axios.post('http://localhost:5000/api/sales', saleData)
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
					<label htmlFor="product"></label>
					<select
						id="product"
						value={productId}
						onChange={(e) => setProductId(e.target.value)}>
					<option value="">Select a product</option>
					{products.map((product) => (
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
