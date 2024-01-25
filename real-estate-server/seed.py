#assumes there will be an app.py file
from app import app
from random import choice, randint
from models import User, Property, SavedListing, Enquiry, db
from faker import Faker
from faker.providers import BaseProvider

fake = Faker()

locations = ['Nairobi', 'Mombasa', 'Berlin', 'Dusseldorf', 'Hannover', 'Rostov', 'St. Lucia', 'Timbuktu', 'Wakanda', 'Vladivostok', 'Los Alamos', 'Bern']

def seed_file():
    User.query.delete()
    Property.query.delete()
    SavedListing.query.delete()
    Enquiry.query.delete()
    
    users = []
    for _ in range(30):
        user = User(
            username=fake.name(),
            email=fake.email(),
            password=fake.password(
                length=8, special_chars=True, digits=True, upper_case=True, lower_case=True
                ),
            isAdmin=choice([True, False]),
        )
        db.session.add(user)
        users.append(user)
    db.session.commit()
    
    properties = []
    for _ in range(100):
        property = Property(
            title=fake.address(),
            description=fake.paragraph(),
            price=randint(50000, 1000000),
            location=choice(locations),
            image=fake.text(max_nb_chars=15),
            isAvailable=choice([True, False])
        )
        db.session.add(property)
        properties.append(property)
    db.session.commit()
    
    
    Listings = []
    enquiries = []
    
    for u in users:
        for _ in range(randint(5, 10)):
            property = choice(properties)
            if u not in property.users:
                property.users.append(u)
                db.session.add(property)
                db.session.commit()
                
                listing = SavedListing(
                    user_id=u.id,
                    property_id=property.id,
                    tag=fake.text(max_nb_chars=50)
                )
                
                enquiry = Enquiry(
                    user_id=u.id,
                    property_id=property.id,
                    message=fake.sentence(),
                )
                Listings.append(listing)
                enquiries.append(enquiry)
            
    db.session.add_all(Listings, enquiries)
    db.session.commit()
    db.session.close()
        
        
if __name__ == '__main__':
    with app.app_context():
        seed_file()