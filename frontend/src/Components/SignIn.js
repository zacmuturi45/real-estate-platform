import AuthCard from "./AuthCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error while validating user");
      }

      const data = await response.json();
      setEmail("");
      setPassword("");
      const access = data.jwt;
      localStorage.setItem("accessToken", access);

      // Redirect to home
      history("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Error while validating user. Please try again.");
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else .
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div id="passwordHelp" className="form-text">
            <a href="/">Forgot your password?</a>
          </div>
        </div>
        <button type="submit" className="btn btn-primary main-btn mt-3">
          Sign In
        </button>
      </form>
    </AuthCard>
  );
}
