import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.svg";
import React, { useContext } from "react";
import { PropertyContext } from "../Contexts/PropertyContext";

export default function Navbar() {
  const { user } = useContext(PropertyContext);

  const handleLogout = () =>{
    localStorage.removeItem("accessToken")
    window.location.reload(true)
    console.log("Logged out")
  } 
  return (
    <nav className="nav-bar">
      <div className="d-flex justify-content-between container-lgs align-items-center">
        <div>
          <img src={Logo} alt="shelter-scape logo" />
        </div>

        <div>
          {user ? (
            <>
              <Link
                to="#"
                className="btn btn-primary ms-2 nav-signup-btn"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="btn btn-outline-danger nav-login-btn"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary ms-2 nav-signup-btn"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
