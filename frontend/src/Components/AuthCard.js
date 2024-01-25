import { useLocation } from "react-router";
import { Link } from "react-router-dom"; 
import Logo from "../Assets/Logo.svg";

export default function AuthCard({ children }) {
  const location = useLocation();

  return (
    <div className="card-container">
      <div className="sign-in-card" style={{ width: "35em" }}>
        <div className="text-center">
          <img src={Logo} alt="shelter-scape logo" />
          <div className="mt-3 mb-3 excerpt">
            {location.pathname === "/signin" ? (
              <h6>
                Don't have an account yet? <Link to="/signup">Sign up here</Link>
              </h6>
            ) : (
              <h6>
                Already have an account? <Link to="/signin">Sign in here</Link>
              </h6>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
