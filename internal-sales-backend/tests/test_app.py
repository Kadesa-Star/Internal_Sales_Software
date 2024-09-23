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

def test_add_valid_product(client):
    response = client.post('/api/products', json={
        'name': 'Test Product',
        'stock_level': 100
    })
    assert response.status_code == 201
    assert b'Product added' in response.data
    data = response.get_json()
    assert data['product']['name'] == 'Test Product'
    assert data['product']['stock_level'] == 100

def test_add_product_missing_name(client):
    response = client.post('/api/products', json={
        'stock_level': 100
    })
    assert response.status_code == 400
    assert b'Invalid input' in response.data

def test_add_product_invalid_stock_level(client):
    response = client.post('/api/products', json={
        'name': 'Invalid Product',
        'stock_level': 'invalid'
    })
    assert response.status_code == 400
    assert b'Invalid input' in response.data

def test_update_product(client):
    # Add a product first
    response = client.post('/api/products', json={
        'name': 'Product to Update',
        'stock_level': 50
    })
    assert response.status_code == 201
    product_id = response.get_json()['product']['id']

    # Update the product
    response = client.put(f'/api/products/{product_id}', json={
        'name': 'Updated Product',
        'stock_level': 75
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['product']['name'] == 'Updated Product'
    assert data['product']['stock_level'] == 75

def test_update_non_existent_product(client):
    response = client.put('/api/products/999', json={
        'name': 'Non-existent Product',
        'stock_level': 100
    })
    assert response.status_code == 404

def test_delete_product(client):
    # Add a product first
    response = client.post('/api/products', json={
        'name': 'Product to Delete',
        'stock_level': 50
    })
    assert response.status_code == 201
    product_id = response.get_json()['product']['id']

    # Delete the product
    response = client.delete(f'/api/products/{product_id}')
    assert response.status_code == 200
    assert b'Product deleted' in response.data

    # Verify the product is deleted
    response = client.get(f'/api/products/{product_id}')
    assert response.status_code == 404

def test_delete_non_existent_product(client):
    response = client.delete('/api/products/999')
    assert response.status_code == 404

