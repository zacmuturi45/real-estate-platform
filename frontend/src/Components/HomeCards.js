import React from "react";

const dummyData = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTcwNjA3MDA1M3ww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    amount: "Ksh. 200,000",
    county: "Westlands, Nairobi County",
    location: "123 Green Avenue, Nairobi, Kenya",
    bedrooms: 4,
    bathrooms: 2,
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTcwNjA3MDA1M3ww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    amount: "Ksh. 250,000",
    county: "Kilimani, Nairobi County",
    location: "456 Blue Street, Nairobi, Kenya",
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTcwNjA3MDA1M3ww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    amount: "Ksh. 180,000",
    county: "Langata, Nairobi County",
    location: "789 Red Road, Nairobi, Kenya",
    bedrooms: 5,
    bathrooms: 3,
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTcwNjA3MDA1M3ww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450",
    amount: "Ksh. 220,000",
    county: "Roysambu, Nairobi County",
    location: "567 Yellow Lane, Nairobi, Kenya",
    bedrooms: 4,
    bathrooms: 2,
  },
];

export default function HomeCards() {
  return (
    <div className="home-container container-lgs row mt-4 gx-2">
      {dummyData.map((property) => (
        <div key={property.id} className="col-sm-3">
          <div className="card property-card" >
            <img
              src={property.imageUrl}
              className="card-img-top"
              alt="property alt"
            />
            <div className="card-body">
              <div className="card-amount">
                <h6>{property.amount}</h6>
              </div>
              <div className="card-county">
                <h5>{property.county}</h5>
              </div>
              <div className="card-location">
                <p>{property.location}</p>
              </div>
            </div>
            <hr className="card-hr" />
            <div className="d-flex justify-content-between custom-card-footer">
              <div className="card-room d-flex">
                <i className="fa-solid fa-bed me-2"></i>
                <p>{`${property.bedrooms} Bedrooms`}</p>
              </div>
              <div className="card-bath d-flex">
                <i className="fa-solid fa-bath me-2"></i>
                <p>{`${property.bathrooms} Bathrooms`}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
