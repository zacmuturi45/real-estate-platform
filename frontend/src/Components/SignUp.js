import AuthCard from "./AuthCard";
import { Link } from "react-router-dom";

export default function SignUp(){
    return(
        <AuthCard>
            <form>
                <div className="mb-3">
                    <div className="row gx-2">
                        <div className="col-sm-6">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstname" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastname" aria-describedby="emailHelp" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm_password" />
                </div>
                <Link type="submit" className="btn btn-primary main-btn mt-3" to="/">Sign Up</Link>
            </form>
        </AuthCard>
    )
}