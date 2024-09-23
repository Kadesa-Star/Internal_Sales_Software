from flask import Blueprint, request, jsonify, render_template
from db import db
from models import Product, Sale
from datetime import datetime

# Define the blueprint
sale_blueprint = Blueprint('sales', __name__, url_prefix='/api/sales')

# Handle OPTIONS requests for CORS preflight
@sale_blueprint.route('', methods=['OPTIONS'])
def options():
    response = jsonify({'message': 'CORS preflight request'})
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Record a new sale
@sale_blueprint.route('', methods=['POST'])
def record_sale():
    data = request.json
    if not data or 'product_id' not in data or 'quantity_sold' not in data:
        return jsonify({'message': 'Missing product_id or quantity_sold'}), 400

    try:
        quantity_sold = int(data['quantity_sold'])
        if quantity_sold <= 0:
            return jsonify({'message': 'Invalid quantity_sold'}), 400
    except ValueError:
        return jsonify({'message': 'Invalid quantity_sold'}), 400

    # Fetch the product by ID
    product = Product.query.get(data['product_id'])
    if product is None:
        return jsonify({'message': 'Product not found'}), 404

    if product.stock_level < quantity_sold:
        return jsonify({'message': 'Not enough stock available'}), 400

    # Deduct the stock level
    product.stock_level -= quantity_sold

    # Record the sale with the current timestamp
    new_sale = Sale(product_id=product.id, quantity_sold=quantity_sold, date=datetime.utcnow())
    db.session.add(new_sale)
    db.session.commit()

    return jsonify({'message': 'Sale recorded successfully', 'sale': new_sale.serialize()}), 200

# List all sales (HTML rendering for an admin dashboard)
@sale_blueprint.route('/list', methods=['GET'])
def show_sale_list():
    sales = Sale.query.all()
    return render_template('sale_list.html', sales=sales)
