from flask import Blueprint, request
from flask_restful import Resource, Api, reqparse, abort
from models import db, Property
from flask_jwt_extended import jwt_required
from sqlalchemy import or_

property_bp = Blueprint('property', __name__)
api = Api(property_bp) 

post_args = reqparse.RequestParser()
#post_args.add_argument('id', type=int, required=True)
post_args.add_argument('title', type=str, required=True)
post_args.add_argument('description', type=str, required=True)
post_args.add_argument('price', type=float, required=True)
post_args.add_argument('location', type=str, required=True)
post_args.add_argument('image', type=str, required=True)
post_args.add_argument('isAvailable', type=bool, required=True)
post_args.add_argument('property_type', type=str, required=True)

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

    @jwt_required()
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

    @jwt_required()
    def delete(self,id):
        property = Property.query.filter_by(id=id).first()
        if not property:
            abort(404, detail=f'property with {id=} does not exist')
        db.session.delete(property)
        db.session.commit()
        return{"detail": f"property with {id=} has been deleted successfully"}
    
class PropertySearch(Resource):
    def get(self):
        location = request.args.get('location')
        price_min = request.args.get('price_min')
        price_max = request.args.get('price_max')
        property_type = request.args.get('type')

        print("Location:", location)
        print("Price Min:", price_min)
        print("Price Max:", price_max)
        print("Property Type:", property_type)

        query = Property.query

        if location:
            query = query.filter(Property.location.ilike(f'%{location}%'))

        if price_min and price_max:
            query = query.filter(Property.price.between(float(price_min), float(price_max)))
        elif price_min:
            query = query.filter(Property.price >= float(price_min))
        elif price_max:
            query = query.filter(Property.price <= float(price_max))

        if property_type:
            query = query.filter(Property.property_type.ilike(f'%{property_type}%'))

        print("Final Query:", query)
        
        properties = query.all()
        response = [property.to_dict() for property in properties]
        return response


api.add_resource(Properties, '/properties')
api.add_resource(PropertyById, '/properties/<int:id>')
api.add_resource(PropertySearch, '/properties/search')