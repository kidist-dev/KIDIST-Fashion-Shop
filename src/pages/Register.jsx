import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Check empty fields
    if (
      !cleanName ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Check email format
    if (!cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Register customer
    const result = register(
      cleanName,
      cleanEmail,
      password
    );

    // Email already exists
    if (!result.success) {
      setError(result.message);
      return;
    }

    // Registration successful
    navigate("/checkout");
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* HEADER */}
        <div className="auth-header">

          <p className="auth-subtitle">
            WELCOME TO LUMÉ
          </p>

          <h1>Create Your Account</h1>

          <p>
            Create an account to continue with your order.
          </p>

        </div>


        {/* FORM */}
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* ERROR */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          {/* NAME */}
          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          {/* EMAIL */}
          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* PASSWORD */}
          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* CONFIRM PASSWORD */}
          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>


          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>


        {/* LOGIN LINK */}
        <div className="auth-footer">

          <p>
            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default Register;