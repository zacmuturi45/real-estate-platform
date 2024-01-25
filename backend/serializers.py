from flask_marshmallow import Marshmallow
from models import User, Profile, Property, SavedListing, Enquiry

ma = Marshmallow()

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User 

    username = ma.auto_field()
    email= ma.auto_field()
