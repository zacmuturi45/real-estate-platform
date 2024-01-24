import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.svg";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="d-flex justify-content-between container-lgs align-items-center">
        <div>
          <img src={Logo} alt="shelter-scape logo" />
        </div>
        <div>
          <Link to="/signin" className="btn btn-outline-danger nav-login-btn">
            Sign in
          </Link>
          <Link to="/signup" className="btn btn-primary ms-2 nav-signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
