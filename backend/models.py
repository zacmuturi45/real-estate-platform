from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

user_property = db.Table(
    'users_properties',
    db.Column('user_id', db.ForeignKey('users.id'), primary_key=True),
    db.Column('property_id', db.ForeignKey('properties.id'), primary_key=True),
)

class User(db.Model, SerializerMixin):
    serialize_rules = ('-properties', '-saved_listings', '-enquiries',)
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    isAdmin = db.Column(db.Boolean, default=False)
    
    properties = db.relationship('Property', secondary=user_property, back_populates='users')
    saved_listings = db.relationship('SavedListing', backref='user', lazy=True)
    enquiries = db.relationship('Enquiry', backref='user', lazy=True)
    profile = db.relationship('Profile', backref='user', uselist=False)

class Profile(db.Model, SerializerMixin):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(25))
    lastname = db.Column(db.String(25))
    email = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ('-user',)

class Property(db.Model, SerializerMixin):
    serialize_rules = ('-users', '-saved_listings', '-enquiries',)
    __tablename__ = 'properties'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255))
    isAvailable = db.Column(db.Boolean, default=True)
    
    users = db.relationship('User', secondary=user_property, back_populates='properties')
    saved_listings = db.relationship('SavedListing', backref='property', lazy=True)
    enquiries = db.relationship('Enquiry', backref='property', lazy=True)

class SavedListing(db.Model):
    __tablename__ = 'savedlistings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    tag = db.Column(db.String(50))

class Enquiry(db.Model, SerializerMixin):
    __tablename__ = 'enquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
