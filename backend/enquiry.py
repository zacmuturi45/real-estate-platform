from flask import Blueprint
from flask_restful import Resource, Api, reqparse, abort
from models import db, Enquiry
from flask_jwt_extended import jwt_required

enquiry_bp = Blueprint('enquiry', __name__)
api = Api(enquiry_bp) 

post_args = reqparse.RequestParser()
post_args.add_argument('id', type=int, required=True)
post_args.add_argument('user_id', type=int, required=True)
post_args.add_argument('property_id', type=int, required=True)
post_args.add_argument('message', type=str)
post_args.add_argument('timestamp', type=str , required=True)


patch_args = reqparse.RequestParser()
patch_args.add_argument('id', type=int)
patch_args.add_argument('user_id', type=int)
patch_args.add_argument('property_id', type=int)
patch_args.add_argument('message', type=str)
patch_args.add_argument('timestamp', type=str)



class Enquiries(Resource):

    @jwt_required()
    def get(self):
        enquiries = Enquiry.query.all()
        response = [enquiry.to_dict() for enquiry in enquiries]
        return response

    @jwt_required()
    def post(self):
        data = post_args.parse_args()
        enquiry = Enquiry.query.get(data.id)
        if enquiry:
            abort(409, detail='enquiry already exists')
        new_product = Enquiry(**data)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict() 

class EnquiryById(Resource):
    @jwt_required()
    def get(self,id):
        enquiry = Enquiry.query.get(id)
        if not enquiry:
            abort(404, detail=f'enquiry with {id=} does not exist')
        return enquiry.to_dict()

    def patch(self,id):
        enquiry = Enquiry.query.get(id)
        if not enquiry:
            abort(404, detail=f'enquiry with {id=} does not exist')
        data = patch_args.parse_args()
        print(data)
        for key,value in data.items():
            if value is None:
                continue
            setattr(enquiry, key, value)
        db.session.commit()

        return enquiry.to_dict()

    def delete(self,id):
        enquiry = Enquiry.query.filter_by(id=id).first()
        if not enquiry:
            abort(404, detail=f'enquiry with {id=} does not exist')
        db.session.delete(enquiry)
        db.session.commit()
        return{"detail": f"enquiry with {id=} has been deleted successfully"}

api.add_resource(Enquiries, '/enquiries')
api.add_resource(EnquiryById, '/enquiries/<int:id>')