import pytest
from app import app, db
from models import Product, Sale

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

def add_product(client, name, stock_level, price=10.0):
    """ Helper function to add a product """
    response = client.post('/api/products', json={
        'name': name,
        'stock_level': stock_level,
        'price': price
    })
    return response.get_json()['product']['id']

def test_record_valid_sale(client):
    # Add a product first
    product_id = add_product(client, 'Test Product', stock_level=50)
    
    # Record a sale
    response = client.post('/api/sales', json={
        'product_id': product_id,
        'quantity_sold': 5
    })
    
    assert response.status_code == 200
    assert b'Sale recorded successfully!' in response.data

def test_record_sale_insufficient_stock(client):
    # Add a product with limited stock
    product_id = add_product(client, 'Limited Stock Product', stock_level=5)
    
    # Try to sell more than available stock
    response = client.post('/api/sales', json={
        'product_id': product_id,
        'quantity_sold': 10
    })
    
    assert response.status_code == 400
    assert b'Not enough stock' in response.data

def test_record_sale_invalid_quantity(client):
    # Add a product first
    product_id = add_product(client, 'Another Product', stock_level=30)
    
    # Record a sale with an invalid quantity
    response = client.post('/api/sales', json={
        'product_id': product_id,
        'quantity_sold': -3  # Invalid negative quantity
    })
    
    assert response.status_code == 400
    assert b'Invalid quantity_sold. Must be a positive integer' in response.data

def test_record_sale_non_existent_product(client):
    # Attempt to record a sale for a product that doesn't exist
    response = client.post('/api/sales', json={
        'product_id': 9999,  # Non-existent product
        'quantity_sold': 3
    })
    
    assert response.status_code == 404
    assert b'Product not found' in response.data

def test_list_sales(client):
    # Add a product and record a few sales
    product_id = add_product(client, 'Product for Sales Listing', stock_level=100)
    client.post('/api/sales', json={'product_id': product_id, 'quantity_sold': 5})
    client.post('/api/sales', json={'product_id': product_id, 'quantity_sold': 10})
    
    # Get the list of sales
    response = client.get('/api/sales/list')
    
    assert response.status_code == 200
    assert b'<table' in response.data  # Assuming a table is rendered for sales listing
    assert b'Product for Sales Listing' in response.data

