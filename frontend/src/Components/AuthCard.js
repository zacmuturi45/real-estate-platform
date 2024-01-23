import Logo from "../Assets/Logo.svg";
export default function AuthCard({ children }) {
  return (
    <div className="card-container">
      <div className="sign-in-card" style={{ width: "35em" }}>
        <div className="text-center">
          <img src={Logo} alt="shelter-scape logo" />
          <div className="mt-3 mb-3 excerpt">
            <h6>
              Don't have an Account yet? <a href="/">Sign up here</a>
            </h6>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
