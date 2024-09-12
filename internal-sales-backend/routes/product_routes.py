from flask import Blueprint, request, jsonify, abort
from db import db
from models import Product


product_blueprint = Blueprint('products', __name__)

# Get all products
@product_blueprint.route('/', methods= ['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': product.id,
        'name': product.name,
        'stock_level': product.stock_level
        } for product in products]), 200

# Add a new product
@product_blueprint.route('/', methods=['POST'])
def add_product():
    data = request.json
    if not data.get('name') or not isinstance(data.get('stock_level'), int):
        return jsonify({'message': 'Invalid input'}), 400
    new_product = Product(name=data['name'], stock_level=data['stock_level'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added', 'product': {
        'id': new_product.id,
        'name': new_product.name,
        'stock_level': new_product.stock_level
        }}), 201

# Update a product
@product_blueprint.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    if product is None:
        abort(404, description="Product not found")

    data = request.json
    product.name = data.get['name', product.name]
    product.stock_level = data.get('stock_level', product.stock_level)
    db.session.commit()

    return jsonify({'message': 'Product updated', 'product': {
        'id': product.id,
        'name': product.name,
        'stock_level': product.stock_level
        }}), 200

# Delete a product
@product_blueprint.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if product is None:
        abort(404, description="Product not found")

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted'}), 200
