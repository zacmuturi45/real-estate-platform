import AuthCard from "./AuthCard";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: `${firstname} ${lastname}`,
          email: email,
          password: password,
          "confirm-password": confirmPassword
        }),
      });

      if (!response.ok) {
        throw new Error("Error while creating user");
      }

      const data = await response.json();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      const access = data.jwt;
      localStorage.setItem("accessToken", access);

      history("/signin");
    } catch (error) {
      console.error("Sign-up failed:", error.message);
      setError("Check your details and try again.");
    }
  };

  return (
    <AuthCard>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <div className="row gx-2">
            <div className="col-sm-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
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
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary main-btn mt-3">
          Sign Up
        </button>
      </form>
    </AuthCard>
  );
}
