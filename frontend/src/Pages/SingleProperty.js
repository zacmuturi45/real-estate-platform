import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

export default function SingleProperty() {
  const params = useParams();
  const [prp, setPrp] = useState([]);

  useEffect(() => {
    fetch("/properties")
      .then((res) => res.json())
      .then((data) => {
        setPrp(data[params.id - 1]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [params.id]);

  return (
    <>
      <Navbar />
      <div className="container-lgs">
        <div className="d-flex align-content-center mt-3">
          <Link to={"/"}>
            <i className="fa-solid fa-arrow-left me-2"></i>
            Back to Property Listings.
          </Link>
        </div>
        <div className="mt-2 property-title">
          <h3>{prp.location}</h3>
        </div>
        <div className="mt-2 property-location">
          <p>{prp.title}</p>
        </div>
        <div className="mt-2 property-image">
          <img
            src={prp.image}
            alt="property"
            style={{ width: "100%", height: "700px", objectFit: "contain" }}
          />
        </div>
        <div className="mt-3 property-description row">
          <div className="col-md-12 col-sm-12 mt-4">
            <h4>About this property</h4>
            <p>{prp.description}</p>
          </div>
          <div className="col-md-12 col-sm-12 tour-card mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p>Rent Price</p>
                <h5 className="mt-2">
                  {`Kshs. ${prp.price}`} <span>/month</span>
                </h5>
              </div>
              <div className="mt-2 d-flex flex-column">
                <Link className="btn btn-primary nav-signup-btn mt-2">
                  Request Tour
                </Link>
                <Link className="btn btn-primary nav-signup-btn mt-2">
                  Add to Favorites
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
