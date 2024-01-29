import { useContext, useState } from "react";
import { PropertyContext } from "../Contexts/PropertyContext";

export default function PropertyModal() {
  // context
  const { token } = useContext(PropertyContext);
  // controlled forms
  const [formData, setFormData] = useState({
    title: "",
    property_type: "",
    image: "",
    location: "",
    price: "",
    description: "",
    isAvailable: true,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    fetch("/properties", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(() => {
        alert("Property added successfully");
        console.log("Property added successfully");
      })
      .catch((error) => {
        console.error("Error adding user:", error.message);
      });
  };

  const handleOnChange = (e) => {
    const key = e.target.id;
    setFormData({ ...formData, [key]: e.target.value });
  };

  return (
    <div
      className="modal fade"
      id="propertyModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modal-heading">
              Add New Property
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="col-form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Property Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="property_type"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Image Url</label>
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Description:</label>
                <textarea
                  className="form-control"
                  id="description"
                  onChange={handleOnChange}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary custom-close-btn"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary custom-submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
