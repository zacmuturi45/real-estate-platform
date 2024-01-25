import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function SingleProperty() {
  return (
    <>
      <Navbar />
      <div className="container-lgs">
        <div className="d-flex align-content-center mt-3">
          <Link>
            <i className="fa-solid fa-arrow-left me-2"></i>
            Back to Property Listings
          </Link>
        </div>
        <div className="mt-2 property-title">
          <h3>Westlands, Nairobi County</h3>
        </div>
        <div className="mt-2 property-location">
          <p>123 Green Avenue, Nairobi, Kenya</p>
        </div>
        <div className="mt-2 property-image">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="property"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="mt-3 property-description row">
          <div className="col-md-9 col-sm-12">
            <h4>About this property</h4>
            <p>
              Nestled in the heart of the lush Lavington neighborhood, 45 Serene
              Lane beckons you with its enchanting charm and warm embrace. This
              captivating home tells a story of comfort, joy, and the beautiful
              journey of family life. Enjoy the convenience of being close to
              shopping centers, schools, and recreational facilities, making
              daily life a breeze.
            </p>
          </div>
          <div className="col-md-3 col-sm-12 tour-card">
            <p>Rent Price</p>
            <h5 className="mt-2">
              Ksh. 200,000 <span>/month</span>
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
