import AuthCard from "./AuthCard";

export default function SignIn() {
  return (
    <AuthCard>
        <form>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
                <div id="passwordHelp" className="form-text">
                    <a href="/">
                        Forgot your password?
                    </a>
                </div>
            </div>
            <button type="submit" className="btn btn-primary main-btn">Submit</button>
        </form>
    </AuthCard>
  );
}
