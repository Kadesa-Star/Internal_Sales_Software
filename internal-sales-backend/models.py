from datetime import datetime  # Import datetime for date handling
from db import db  # Import the db instance from db.py

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock_level = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'stock_level': self.stock_level
        }

class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity_sold = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)  # Added date field

    def serialize(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'quantity_sold': self.quantity_sold,
            'date': self.date  # Optionally include date in serialization
        }
