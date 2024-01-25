from flask import Blueprint
from flask_restful import Resource, Api, reqparse, abort
from models import db, User
from flask_bcrypt import Bcrypt
from serializers import UserSchema
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

user_bp = Blueprint('user', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(user_bp) 

post_args = reqparse.RequestParser()
#post_args.add_argument('id', type=int, required=True)
post_args.add_argument('username', type=str, required=True)
post_args.add_argument('email', type=str, required=True)
post_args.add_argument('password', type=str, required=True)
post_args.add_argument('confirm-password', type=str, required=True)
#post_args.add_argument('isAdmin', type=bool, required=True)

patch_args = reqparse.RequestParser()
#patch_args.add_argument('id', type=int)
patch_args.add_argument('username', type=str)
patch_args.add_argument('email', type=str)
patch_args.add_argument('password', type=str)
#patch_args.add_argument('isAdmin', type=bool)

login_args = reqparse.RequestParser() 
login_args.add_argument('email', type=str, required=True)
login_args.add_argument('password', type=str, required=True)


user_schema = UserSchema()

class Users(Resource):

    @jwt_required()
    def get(self):
        users = User.query.all()
        #response = [user.to_dict() for user in users]
        return user_schema.dump(users, many=True)

    def post(self):
        data = post_args.parse_args()
        # user = User.query.get(data.id)
        # if user:
        #     abort(409, detail='user already exists')
        if data['password'] == data['confirm-password']:
            hashed_password = bcrypt.generate_password_hash(data['password'])
            new_user = User(username=data['username'], email=data['email'], password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return user_schema.dump(new_user)
        
class UserLogin(Resource):
    def post(self):
        data = login_args.parse_args()
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            abort(404, detail="user does not exist")
        if not bcrypt.check_password_hash(user.password, data['password']):
            abort(403, detail="Password is not correct")
        metadata = {"username": user.username}
        token = create_access_token(identity=user.id, additional_claims=metadata)
        return {"jwt":token}

class UserById(Resource):
    def get(self,id):
        user = User.query.get(id)
        if not user:
            abort(404, detail=f'user with {id=} does not exist')
        return user.to_dict()

    def patch(self,id):
        user = User.query.get(id)
        if not user:
            abort(404, detail=f'user with {id=} does not exist')
        data = patch_args.parse_args()
        print(data)
        for key,value in data.items():
            if value is None:
                continue
            setattr(user, key, value)
        db.session.commit()

        return user.to_dict()

    def delete(self,id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, detail=f'user with {id=} does not exist')
        db.session.delete(user)
        db.session.commit()
        return{"detail": f"user with {id=} has been deleted successfully"}

api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(UserLogin, '/login')