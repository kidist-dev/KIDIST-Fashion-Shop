import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Check empty fields
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Try login
    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Where should the customer go after login?
    const destination =
      location.state?.from?.pathname || "/";

    navigate(destination);
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* HEADER */}

        <div className="auth-header">

          <p className="auth-subtitle">
            WELCOME BACK TO LUMÉ
          </p>

          <h1>
            Login
          </h1>

          <p>
            Sign in to continue with your shopping.
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


          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
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

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>


        {/* REGISTER LINK */}

        <div className="auth-footer">

          <p>
            Don't have an account?{" "}

            <Link
              to="/register"
              state={location.state}
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}

export default Login;