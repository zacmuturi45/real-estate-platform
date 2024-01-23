import AuthCard from "./AuthCard";

export default function SignUp(){
    return(
        <AuthCard>
            <form>
                <div className="mb-3">
                    <div className="row gx-2">
                        <div className="col-sm-6">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="col-sm-6">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary main-btn">Sign Up</button>
            </form>
        </AuthCard>
    )
}