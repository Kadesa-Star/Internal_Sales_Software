from app import app  # Import your Flask app
from db import db

def check_schema():
    with app.app_context():
        inspector = db.inspect(db.engine)
        columns = inspector.get_columns('product')
        for column in columns:
            print(f"Column Name: {column['name']}, Type: {column['type']}, Nullable: {column['nullable']}")

if __name__ == "__main__":
    check_schema()

