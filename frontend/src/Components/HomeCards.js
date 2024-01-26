import React, { useContext } from "react";
import { PropertyContext } from "../Contexts/PropertyContext";

/* const defaultImageUrl =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0Mzc0NDd8MHwxfHNlYXJjaHwzfHxyZWFsJTIwZXN0YXRlfGVufDB8fHx8MTcwNjA3MDA1M3ww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450";
 */
export default function HomeCards() {
  const { propertyData} = useContext(PropertyContext);

  return (
    <div className="home-container container-lgs row mt-4 gx-2">
      {propertyData.map((property) => (
        <div key={property.id} className="col-sm-3 mb-2">
          <div className="card property-card h-100">
            <img
              src={property.image}
              className="card-img-top"
              alt="property alt"
            />
            <div className="card-body">
              <div className="card-amount">
                <h6>Ksh. {property.price}</h6>
              </div>
              <div className="card-county">
                <h5>{property.location}</h5>
              </div>
              <div className="card-location">
                <p>{property.title}</p>
              </div>
            </div>
            <hr className="card-hr" />
            <div className="d-flex justify-content-between custom-card-footer">
              <div className="card-room d-flex">
                <i className="fa-solid fa-bed me-2"></i>
                <p>{`${property.bedrooms || 1} Bedrooms`}</p>
              </div>
              <div className="card-bath d-flex">
                <i className="fa-solid fa-bath me-2"></i>
                <p>{`${property.bathrooms || 3} Bathrooms`}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
