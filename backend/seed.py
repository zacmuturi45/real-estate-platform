from app import app
from random import choice, randint
from models import User, Property, SavedListing, Enquiry, db, Profile
from faker import Faker
from faker.providers import BaseProvider

fake = Faker()

locations = ['Nairobi', 'Mombasa', 'Berlin', 'Dusseldorf', 'Hannover', 'Rostov', 'St. Lucia', 'Timbuktu', 'Wakanda', 'Vladivostok', 'Los Alamos', 'Bern']
images = [
    'https://shorturl.at/lwLNR',
    'https://shorturl.at/mnsCY',
    'https://shorturl.at/yKOT3',
    'https://shorturl.at/ivCD8',
    'http://tinyurl.com/4apt9k94',
    'http://tinyurl.com/5n7rbztx',
    'http://tinyurl.com/mtuc79v7',
    'http://tinyurl.com/4ahnftm8',
    'http://tinyurl.com/3urr565p',
    'http://tinyurl.com/4adswm53',
    'http://tinyurl.com/6ktet7fy',
    'http://tinyurl.com/4ecma6bv',
    'http://tinyurl.com/dyf555ej',
    'http://tinyurl.com/mt95m9kr',
    'http://tinyurl.com/5n86d4nu',
    'http://tinyurl.com/2r3p9a47',
    'http://tinyurl.com/yty7d2rk',
    'http://tinyurl.com/48k43f4e',
    'http://tinyurl.com/2zjbruhb',
    'http://tinyurl.com/4aphy4yp'
]



def seed_file():
    User.query.delete()
    Property.query.delete()
    SavedListing.query.delete()
    Enquiry.query.delete()
    Profile.query.delete()
    
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
            image=choice(images),
            isAvailable=choice([True, False])
        )
        db.session.add(property)
        properties.append(property)
    db.session.commit()
    
    
    Listings = []
    enquiries = []
    Profiles = []
    
    for u in users:
        profile = Profile(
            firstname = fake.first_name(),
            lastname = fake.last_name(),
            email = fake.email(),
            user_id = u.id
        )
        Profiles.append(profile)
        
        for _ in range(randint(5, 10)):
            property = choice(properties)
            if u not in property.users:
                property.users.append(u)
                db.session.add(property)
                
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
            
    db.session.add_all(Listings + enquiries + Profiles)
    db.session.commit()
    db.session.close()
        
if __name__ == '__main__':
    with app.app_context():
        seed_file()