import Logo from "../Assets/Logo.svg";

export default function AuthGuard() {
  return (
    <div className="card-container">
      <div className="sign-in-card" style={{ width: "35em" }}>
        <div className="text-center">
          <img src={Logo} alt="shelter-scape logo" />
          <div className="mt-3 mb-3 guard">
            <h6>You are Not Authorized to view this page</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
