from flask import Flask
from flask_cors import CORS  # Import CORS
from db import db
from routes.product_routes import product_blueprint
from routes.sale_routes import sale_blueprint

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sales.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the app with the db object
db.init_app(app)

# Create the database tables if they don't exist (only for development)
with app.app_context():
    db.create_all()

app.register_blueprint(product_blueprint, url_prefix='/api/products')
app.register_blueprint(sale_blueprint, url_prefix='/api/sales')

@app.route('/')
def home():
    return "Internal Sales Software Backend"

if __name__ == '__main__':
    app.run(debug=True)

