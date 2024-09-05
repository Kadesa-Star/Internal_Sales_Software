from flask import Flask, request, jsonify
from db import db
from models import Product, Sale
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sales.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Initialize the app with the db object
db.init_app(app)

# Create the database tables if they dont exist (only for development)
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Internal Sales Software Backend"

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.name for product in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(name=data['name'], stock_level=data['stock_level'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added'}), 201

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)
    data = request.json
    product.name = data['name']
    product.stock_level = data['stock_level']
    db.session.commit()
    return jsonify({'message': 'Product updated'})

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'})

@app.route('/api/sales', methods=['POST'])
def record_sale():
    data = request.json
    product = Product.query.get(data['product_id'])
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
    return jsonify({'message': 'Sale recorded'})

if __name__ == '__main__':
    app.run(debug=True)
