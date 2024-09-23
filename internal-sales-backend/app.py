from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv

from db import db  # Import the db instance
from models import Product, Sale  # Import your models
from routes.product_routes import product_blueprint
from routes.sale_routes import sale_blueprint

# Load environment variables
load_dotenv()

# Create the Flask app
app = Flask(__name__)

# Load config (adjust this to your own config setup)
app.config.from_object('config.Config')

# Initialize the database and migrations
db.init_app(app)
migrate = Migrate(app, db)

# Enable CORS for your API routes
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Register the blueprints
app.register_blueprint(product_blueprint)
app.register_blueprint(sale_blueprint)

# Metrics endpoint
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    total_products = Product.query.count()
    total_sales = Sale.query.count()
    total_stock_level = db.session.query(db.func.sum(Product.stock_level)).scalar() or 0

    metrics = {
        'total_products': total_products,
        'total_sales': total_sales,
        'total_stock_level': total_stock_level
    }

    return jsonify(metrics), 200

# Global error handler for 500 Internal Server Error
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Something went wrong on the server'}), 500

# Global error handler for 404 Not Found
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

# Main entry point
if __name__ == "__main__":
    app.run()

