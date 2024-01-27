from flask import Flask
from flask_migrate import Migrate
from models import db
from property import property_bp, api as property_api
from user import user_bp, api as user_api, bcrypt, jwt
from savedlisting import savedlisting_bp, api as savedlisting_api
from enquiry import enquiry_bp, api as enquiry_api
from serializers import ma 
from flask_cors import CORS
from datetime import timedelta


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///realestate.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['SECRET_KEY'] = 'tvbubvhriefjkwerty='

db.init_app(app)
CORS(app)
bcrypt.init_app(app)
ma.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)

property_api.init_app(property_bp)
app.register_blueprint(property_bp)

user_api.init_app(user_bp)
app.register_blueprint(user_bp)

savedlisting_api.init_app(savedlisting_bp)
app.register_blueprint(savedlisting_bp)

enquiry_api.init_app(enquiry_bp)
app.register_blueprint(enquiry_bp)


if __name__ == '__main__':
    app.run(port=5555, debug=True)