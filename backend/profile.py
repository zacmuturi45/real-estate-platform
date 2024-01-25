from flask import Blueprint
from flask_restful import Resource, Api, reqparse, abort
from models import db, Profile

profile_bp = Blueprint('profile', __name__)
api = Api(profile_bp) 

post_args = reqparse.RequestParser()
post_args.add_argument('id', type=int, required=True)
post_args.add_argument('firstname', type=str, required=True)
post_args.add_argument('lastname', type=str, required=True)
post_args.add_argument('email', type=str, required=True)
post_args.add_argument('user_id', type=int, required=True)

patch_args = reqparse.RequestParser()
patch_args.add_argument('id', type=int,required=True)
patch_args.add_argument('firstname', type=str)
patch_args.add_argument('lastname', type=str)
patch_args.add_argument('email', type=str)
patch_args.add_argument('user_id', type=int)


class Profiles(Resource):

    def get(self):
        profiles = Profile.query.all()
        response = [profile.to_dict() for profile in profiles]
        return response

    def post(self):
        data = post_args.parse_args()
        profile = Profile.query.get(data.id)
        if profile:
            abort(409, detail='profile already exists')
        new_product = Profile(**data)
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict() 

class ProfileById(Resource):
    def get(self,id):
        profile = Profile.query.get(id)
        if not profile:
            abort(404, detail=f'profile with {id=} does not exist')
        return profile.to_dict()

    def patch(self,id):
        profile = Profile.query.get(id)
        if not profile:
            abort(404, detail=f'profile with {id=} does not exist')
        data = patch_args.parse_args()
        print(data)
        for key,value in data.items():
            if value is None:
                continue
            setattr(profile, key, value)
        db.session.commit()

        return profile.to_dict()

    def delete(self,id):
        profile = Profile.query.filter_by(id=id).first()
        if not profile:
            abort(404, detail=f'profile with {id=} does not exist')
        db.session.delete(profile)
        db.session.commit()
        return{"detail": f"profile with {id=} has been deleted successfully"}

api.add_resource(Profiles, '/profiles')
api.add_resource(ProfileById, '/profiles/<int:id>')