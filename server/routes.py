from flask import Blueprint, jsonify, request
from .models import User, Property, SavedListing, Enquiry, db

api_bp = Blueprint('api', __name__)

# User Routes
@api_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@api_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.serialize())

@api_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(username=data['username'], email=data['email'], password=data['password'], isAdmin=data['isAdmin'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully", "user_id": new_user.id})

@api_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.username = data['username']
    user.email = data['email']
    user.password = data['password']
    user.isAdmin = data['isAdmin']
    db.session.commit()
    return jsonify({"message": "User updated successfully"})

@api_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"})

# Property Routes
@api_bp.route('/properties', methods=['GET'])
def get_properties():
    properties = Property.query.all()
    return jsonify([property.serialize() for property in properties])

@api_bp.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    property_instance = Property.query.get_or_404(property_id)
    return jsonify(property_instance.serialize())

@api_bp.route('/properties', methods=['POST'])
def create_property():
    data = request.json
    new_property = Property(title=data['title'], description=data['description'], price=data['price'], location=data['location'], image=data['image'], isAvailable=data['isAvailable'])
    db.session.add(new_property)
    db.session.commit()
    return jsonify({"message": "Property created successfully", "property_id": new_property.id})

@api_bp.route('/properties/<int:property_id>', methods=['PUT'])
def update_property(property_id):
    property_instance = Property.query.get_or_404(property_id)
    data = request.json
    property_instance.title = data['title']
    property_instance.description = data['description']
    property_instance.price = data['price']
    property_instance.location = data['location']
    property_instance.image = data['image']
    property_instance.isAvailable = data['isAvailable']
    db.session.commit()
    return jsonify({"message": "Property updated successfully"})

@api_bp.route('/properties/<int:property_id>', methods=['DELETE'])
def delete_property(property_id):
    property_instance = Property.query.get_or_404(property_id)
    db.session.delete(property_instance)
    db.session.commit()
    return jsonify({"message": "Property deleted successfully"})

# SavedListing Routes
@api_bp.route('/savedlistings', methods=['GET'])
def get_savedlistings():
    savedlistings = SavedListing.query.all()
    return jsonify([savedlisting.serialize() for savedlisting in savedlistings])

@api_bp.route('/savedlistings/<int:savedlisting_id>', methods=['GET'])
def get_savedlisting(savedlisting_id):
    savedlisting = SavedListing.query.get_or_404(savedlisting_id)
    return jsonify(savedlisting.serialize())

@api_bp.route('/savedlistings', methods=['POST'])
def create_savedlisting():
    data = request.json
    new_savedlisting = SavedListing(user_id=data['user_id'], property_id=data['property_id'], tag=data['tag'])
    db.session.add(new_savedlisting)
    db.session.commit()
    return jsonify({"message": "SavedListing created successfully", "savedlisting_id": new_savedlisting.id})

@api_bp.route('/savedlistings/<int:savedlisting_id>', methods=['DELETE'])
def delete_savedlisting(savedlisting_id):
    savedlisting = SavedListing.query.get_or_404(savedlisting_id)
    db.session.delete(savedlisting)
    db.session.commit()
    return jsonify({"message": "SavedListing deleted successfully"})

# Enquiry Routes
@api_bp.route('/enquiries', methods=['GET'])
def get_enquiries():
    enquiries = Enquiry.query.all()
    return jsonify([enquiry.serialize() for enquiry in enquiries])

@api_bp.route('/enquiries/<int:enquiry_id>', methods=['GET'])
def get_enquiry(enquiry_id):
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    return jsonify(enquiry.serialize())

@api_bp.route('/enquiries', methods=['POST'])
def create_enquiry():
    data = request.json
    new_enquiry = Enquiry(user_id=data['user_id'], property_id=data['property_id'], message=data['message'])
    db.session.add(new_enquiry)
    db.session.commit()
    return jsonify({"message": "Enquiry created successfully", "enquiry_id": new_enquiry.id})

@api_bp.route('/enquiries/<int:enquiry_id>', methods=['DELETE'])
def delete_enquiry(enquiry_id):
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    db.session.delete(enquiry)
    db.session.commit()
    return jsonify({"message": "Enquiry deleted successfully"})
