import { Link, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import EnquiryModel from "../Components/EnquiryModel";
import { PropertyContext } from "../Contexts/PropertyContext";

export default function SingleProperty() {
  const params = useParams();
  const [prp, setPrp] = useState([]);
  const {userid} = useContext(PropertyContext)

  const addToFavorites = async () => {
    try {
      const response = await fetch("/savedlistings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userid, 
          property_id: prp.id,
          tag: "favorite", 
        }),
      });
      
      if (response.ok) {
        alert("Added to favorites successfully");
      } else {
        alert("Failed to add to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites");
    }
  };

  const handleEnquiry = () => {
    const modal = new window.bootstrap.Modal(
      document.getElementById("enquiryModel")
    );
    modal.show();
  };

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
                <Link
                  className="btn btn-primary nav-signup-btn mt-2"
                  onClick={() => handleEnquiry()}
                >
                  Make an Enquiry
                </Link>
                <button className="btn btn-primary nav-signup-btn mt-2" onClick={addToFavorites}>
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EnquiryModel property_id={prp.id}/>
    </>
  );
}
