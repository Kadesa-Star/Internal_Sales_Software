from db import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    stock_level = db.Column(db.Integer, nullable=False)

class Sale(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity_sold = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    product = db.relationship('Product', backref=db.backref('sales', lazy=True))
