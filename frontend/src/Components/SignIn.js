import AuthCard from "./AuthCard";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <AuthCard>
        <form>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else .</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" />
                <div id="passwordHelp" className="form-text">
                    <a href="/">
                        Forgot your password?
                    </a>
                </div>
            </div>
            <Link type="submit" className="btn btn-primary main-btn mt-3" to="/">Sign In</Link>
        </form>
    </AuthCard>
  );
}
