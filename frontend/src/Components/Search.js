import React, { useState } from "react";

export default function Search({ onSearch }) {

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked"); 
    const searchData = {
      location,
      price,
      type: propertyType,
    };
    onSearch(searchData);
  };

  return (
    <div className="row container-lgs mt-3 realtor-width search-form">
      <form className="search" onSubmit={handleSubmit}>
        <div className="row gx-6">
          <div className="col-sm-3 border-custom">
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control search-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nairobi,Kenya"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-3 border-custom">
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control search-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Ksh.200,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-3 border-custom">
            <div className="mb-3">
              <label className="form-label">Property Type</label>
              <input
                type="text"
                className="form-control search-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Condos"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-3 d-flex search-btn mx-auto">
            <div className="form-floating mb-3 w-100">
              <button type="submit" className="btn btn-primary nav-signup-btn w-100">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
