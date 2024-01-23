import Logo from "../Assets/Logo.svg";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="d-flex justify-content-between container-lgs align-items-center">
        <div>
          <img src={Logo} alt="shelter-scape logo" />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-danger nav-login-btn">
            Login
          </button>
          <button type="submit" className="btn btn-primary ms-2 nav-signup-btn">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
