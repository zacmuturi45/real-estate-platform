## SHELTER SCAPE

Welcome to **Shelter Scape**, a mini web app, where users can check for property listings available, search for listings based on their desired location and budget and enquire about the listing.

## Setup

1. Clone this repository to your local environment.
2. Go to it's directory in the terminal and navigate into the backend directory and run `pipenv intstall` to install backend dependencies. After that, run `export FLASK_APP=app.py` then `flask run` . This will start your flask application.
3. In a new terminal, navigate into the frontend directory and run `npm install` to install front end dependencies. After that, run `npm start`. This will run your React app.

## Deployment Links

 - Backend https://shelter-scape.onrender.com

## Features

- Property Listings: Users can browse a vast array of property listings with detailed information on each property.Property details include title, description, price, location, and contact forms for inquiries.
- User Accounts: Users can create accounts to personalize their experience.Registered users can save their preferred listings for easy access.
- Search and Filters: Implement search functionality allowing users to find properties based on specific criteria.Filters for location, price range, and property type enhance the search experience.
- Contact Forms: Users can inquire about a property directly through a contact form, facilitating communication between buyers and sellers.
- User Authentication: Secure user authentication ensures data privacy and allows users to manage their saved listings.

## Models and Relationships

- `User` - A user is able to sign up if they do not have an account and log in if they do. A user can either be a normal user or an Admin. A user can view property listings, save a property to favourites and enquire about the property. An admin can view a list of all users, add, delete and edit a property and view a list of all user enquiries.
- `Profile` - After a user signs up their profile details are saved. Has one to one relationship with User.
- `Property` - The individual houses displayed on the page. Has a relationship with user through enquiry and savedlisting model. Has many to many relationship with the user as a user can save many properties and a property can be saved by many users.
- `SavedListing` - Represents when a user saves a property to favorites. Has one to many relationship with User as one user can save many listings.
- `Enquiry` - Represent when a user requests for a house tour. Has one to many relationship with user.

## Routes

Some of the endpoints include:

### GET /properties

This is used when the page loads

```json
[
    {
    "description": "Guy law door watch conference owner. Play analysis theory.",
    "location": "St. Lucia",
    "isAvailable": false,
    "property_type": "Cottage",
    "price": 910520.0,
    "id": 1,
    "title": "7757 Obrien Radial\nLake Philip, NJ 13431",
    "image": "http://tinyurl.com/4adswm53"
  }
    
]
```

### POST /savedlistings

This is used when the user clicks the 'Add-to-favourites' button

```json
{
  
    {
    "user_id" : 12,
    "property_id": 100
  }
}
```
### GET users/<user_id>

This is to get individual user details.

```json
{
    "id": 1,
    "username": "example_user",
    "email": "user@example.com",
    "isAdmin": false,
    "profile": {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com"
    },
    "properties": [
        {
            "id": 1,
            "title": "Property 1",
            "description": "Description of Property 1",
            "price": 100000,
            "location": "Location of Property 1",
            "image": "http://example.com/image1.jpg",
            "isAvailable": true,
            "property_type": "House"
        },
        {
            "id": 2,
            "title": "Property 2",
            "description": "Description of Property 2",
            "price": 150000,
            "location": "Location of Property 2",
            "image": "http://example.com/image2.jpg",
            "isAvailable": true,
            "property_type": "Apartment"
        }
    ],
    "saved_listings": [
        {
            "id": 1,
            "property_id": 1,
            "timestamp": "2024-01-29T12:00:00Z",
            "tag": "favorite"
        }
    ],
    "enquiries": [
        {
            "id": 1,
            "property_id": 1,
            "message": "I'm interested in this property.",
            "timestamp": "2024-01-29T12:00:00Z"
        }
    ]
}
```
## License

This project is licesed under the MIT terms and conditions.

