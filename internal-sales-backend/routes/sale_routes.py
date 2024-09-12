from flask import Blueprint, request, jsonify, abort
from db import db
from models import Product, Sale
from datetime import datetime


sale_blueprint = Blueprint('sales', __name__)


# Record a new sale
@sale_blueprint.route('/', methods=['POST'])
def record_sale():
    data = request.json
    product = Product.query.get(data['product_id'])

    if product is None:
        return jsonify({'message': 'Product not found'}), 404

    if product.stock_level < data['quantity_sold']:
        return jsonify({'message': 'Not enough stock'}), 400

    new_sale = Sale(
            product_id=data['product_id'],
            quantity_sold=data['quantity_sold'],
            date=datetime.utcnow()
            )

    product.stock_level -= data['quantity_sold']
    db.session.add(new_sale)
    db.session.commit()

    return jsonify({'message': 'Sale recorded', 'sale': {
        'product_id': new_sale.product_id,
        'quantity_sold': new_sale.quantity_sold,
        'date': new_sale.date
        }}), 201
