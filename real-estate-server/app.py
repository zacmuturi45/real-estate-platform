from flask import Flask
from flask_migrate import Migrate
from models import db
from property import property_bp, api as property_api
from user import user_bp, api as user_api


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

property_api.init_app(property_bp)
app.register_blueprint(property_bp)

user_api.init_app(user_bp)
app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(port=5555, debug=True)