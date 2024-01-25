from flask import Blueprint
from flask_restful import Resource, Api, reqparse, abort
from models import db, Property

property_bp = Blueprint('property', __name__)
api = Api(property_bp) 

post_args = reqparse.RequestParser()
post_args.add_argument('id', type=int, required=True)
post_args.add_argument('title', type=str, required=True)
post_args.add_argument('description', type=str, required=True)
post_args.add_argument('price', type=float, required=True)
post_args.add_argument('location', type=str, required=True)
post_args.add_argument('image', type=str, required=True)
post_args.add_argument('isAvailable', type=bool, required=True)

patch_args = reqparse.RequestParser()
patch_args.add_argument('title', type=str)
patch_args.add_argument('description', type=str)
patch_args.add_argument('price', type=float)
patch_args.add_argument('location', type=str)
patch_args.add_argument('image', type=str)
patch_args.add_argument('isAvailable', type=bool)


class Properties(Resource):

    def get(self):
        properties = Property.query.all()
        response = [property.to_dict() for property in properties]
        return response

    def post(self):
        data = post_args.parse_args()
        property = Property.query.get(data.id)
        if property:
            abort(409, detail='property already exists')
        new_product = Property(**data)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict() 

class PropertyById(Resource):
    def get(self,id):
        property = Property.query.get(id)
        if not property:
            abort(404, detail=f'property with {id=} does not exist')
        return property.to_dict()

    def patch(self,id):
        property = Property.query.get(id)
        if not property:
            abort(404, detail=f'property with {id=} does not exist')
        data = patch_args.parse_args()
        print(data)
        for key,value in data.items():
            if value is None:
                continue
            setattr(property, key, value)
        db.session.commit()

        return property.to_dict()

    def delete(self,id):
        property = Property.query.filter_by(id=id).first()
        if not property:
            abort(404, detail=f'property with {id=} does not exist')
        db.session.delete(property)
        db.session.commit()
        return{"detail": f"property with {id=} has been deleted successfully"}

api.add_resource(Properties, '/properties')
api.add_resource(PropertyById, '/properties/<int:id>')