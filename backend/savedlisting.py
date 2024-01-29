from flask import Blueprint
from flask_restful import Resource, Api, reqparse, abort
from models import db, SavedListing
from serializers import SavedListingSchema

savedlisting_bp = Blueprint('savedlisting', __name__)
api = Api(savedlisting_bp) 

post_args = reqparse.RequestParser()
#post_args.add_argument('id', type=int, required=True)
post_args.add_argument('user_id', type=int)
post_args.add_argument('property_id', type=int)
post_args.add_argument('timestamp', type=str)
post_args.add_argument('tag', type=str)

patch_args = reqparse.RequestParser()
patch_args.add_argument('id', type=int)
patch_args.add_argument('user_id', type=int)
patch_args.add_argument('property_id', type=int)
patch_args.add_argument('timestamp', type=str)
patch_args.add_argument('tag', type=str)

savedlisting_schema = SavedListingSchema()

class SavedListings(Resource):

    def get(self):
        savedlistings = SavedListing.query.all()
        response = [savedlisting.to_dict() for savedlisting in savedlistings]
        return response

    def post(self):
        data = post_args.parse_args()
        savedlisting = SavedListing.query.filter_by(user_id=data['user_id'], property_id=data['property_id']).first()
        if savedlisting:
            abort(409, detail='savedlisting already exists')
        new_savedlisting = SavedListing(**data)
        db.session.add(new_savedlisting)
        db.session.commit()
        return savedlisting_schema.dump(new_savedlisting)

    def add_to_favorites(self):
        data = post_args.parse_args()
        savedlisting = SavedListing.query.filter_by(user_id=data['user_id'], property_id=data['property_id']).first()
        if savedlisting:
            abort(409, detail='savedlisting already exists')
        new_savedlisting = SavedListing(**data)
        db.session.add(new_savedlisting)
        db.session.commit()
        return new_savedlisting.to_dict()

class SavedListingById(Resource):
    def get(self,id):
        savedlisting = SavedListing.query.get(id)
        if not savedlisting:
            abort(404, detail=f'savedlisting with {id=} does not exist')
        return savedlisting.to_dict()

    def patch(self,id):
        savedlisting = SavedListing.query.get(id)
        if not savedlisting:
            abort(404, detail=f'savedlisting with {id=} does not exist')
        data = patch_args.parse_args()
        print(data)
        for key,value in data.items():
            if value is None:
                continue
            setattr(savedlisting, key, value)
        db.session.commit()

        return savedlisting.to_dict()

    def delete(self,id):
        savedlisting = SavedListing.query.filter_by(id=id).first()
        if not savedlisting:
            abort(404, detail=f'savedlisting with {id=} does not exist')
        db.session.delete(savedlisting)
        db.session.commit()
        return{"detail": f"savedlisting with {id=} has been deleted successfully"}

api.add_resource(SavedListings, '/savedlistings')
api.add_resource(SavedListingById, '/savedlistings/<int:id>')