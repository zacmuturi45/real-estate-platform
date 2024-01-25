import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div className="row container-lgs mt-3 realtor-width search-form">
      <form className="search">
        <div className="row gx-6">
          <div className="col-sm-3 border-custom">
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="email"
                className="form-control search-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nairobi,Kenya"
              />
            </div>
          </div>
          <div className="col-sm-3 border-custom">
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="email"
                className="form-control search-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Ksh.200,000"
              />
            </div>
          </div>
          <div className="col-sm-3 border-custom">
            <div className="mb-3">
              <label className="form-label">Property Type</label>
              <input
                type="email"
                className="form-control search-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Condos"
              />
            </div>
          </div>
          <div className="col-sm-3 d-flex search-btn mx-auto">
            <div className="form-floating mb-3 w-100">
              <Link to="#" className="btn btn-primary nav-signup-btn w-100">
                Search
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
