from flask import Blueprint, request, jsonify, abort
from db import db
from models import Product

# Define the blueprint
product_blueprint = Blueprint('products', __name__, url_prefix='/api/products')

# Handle OPTIONS requests for CORS preflight
@product_blueprint.route('', methods=['OPTIONS'])
def options():
    response = jsonify({'message': 'CORS preflight request'})
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

# Get all products
@product_blueprint.route('', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': product.id,
        'name': product.name,
        'stock_level': product.stock_level,
        'price': product.price
    } for product in products]), 200

# Add a new product
@product_blueprint.route('', methods=['POST'])
def add_product():
    data = request.json
    if not data or 'name' not in data or 'stock_level' not in data or 'price' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    # Check if the product already exists
    product = Product.query.filter_by(name=data['name']).first()
    if product:
        return jsonify({'message': 'Product with this name already exists.'}), 409

    # Create a new product
    new_product = Product(
        name=data['name'],
        stock_level=int(data['stock_level']),
        price=float(data['price'])
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added', 'product': new_product.serialize()}), 201

# Update an existing product's stock level and price 
@product_blueprint.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    if not product:
        abort(404, description="Product not found")

    data = request.json
    if 'stock_level' in data:
        # Increase the stock level instead of replacing it
        product.stock_level += int(data['stock_level'])
    if 'price' in data:
        product.price = float(data['price'])

    db.session.commit()
    return jsonify({'message': 'Product updated', 'product': product.serialize()}), 200

# Delete a product
@product_blueprint.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        abort(404, description="Product not found")

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted'}), 200

