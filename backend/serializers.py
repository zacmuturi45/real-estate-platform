from flask_marshmallow import Marshmallow
from marshmallow.fields import Nested
from models import User, Enquiry

ma = Marshmallow()

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User 

    username = ma.auto_field()
    email= ma.auto_field()
    enquiries = Nested('EnquirySchema', many=True)

class EnquirySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Enquiry

    id = ma.auto_field()
    user_id = ma.auto_field()
    property_id = ma.auto_field()
    message = ma.auto_field()
    timestamp = ma.auto_field()
