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

## License

This project is licesed under the MIT terms and conditions.

