import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";


export default function SingleProperty() {
  const params = useParams();
  const [prp, setPrp] = useState([])

  useEffect(() => {
    fetch("/properties")
      .then((res) => res.json())
      .then((data) => {
        setPrp(data[params.id - 1])
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-lgs">
        <div className="d-flex align-content-center mt-3">
          <Link to={"/"}>
            <i className="fa-solid fa-arrow-left me-2"></i>
            Back to Property Listings
          </Link>
        </div>
        <div className="mt-2 property-title">
          <h3>{prp.title}</h3>
        </div>
        <div className="mt-2 property-location">
          <p>{prp.location}</p>
        </div>
        <div className="mt-2 property-image">
          <img
            src={prp.image}
            alt="property"
            style={{ width: "100%", height: "700px" }}
          />
        </div>
        <div className="mt-3 property-description row">
          <div className="col-md-9 col-sm-12">
            <h4>About this property</h4>
            <p>{prp.description}</p>
          </div>
          <div className="col-md-3 col-sm-12 tour-card">
            <p>Rent Price</p>
            <h5 className="mt-2">
              {`Kshs. ${prp.price}`} <span>/month</span>
            </h5>
            <div className="mt-2">
              <Link className="btn btn-primary nav-signup-btn mt-2">
                Request Tour
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
