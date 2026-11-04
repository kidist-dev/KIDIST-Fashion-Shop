import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="profile-page">

      <section className="profile-header">
        <p className="profile-label">MY ACCOUNT</p>

        <h1>Welcome, {user?.name}</h1>

        <p>
          Manage your account and view your shopping activity.
        </p>
      </section>

      <section className="profile-container">

        <div className="profile-card">

          <div className="profile-card-header">
            <div>
              <p className="profile-card-label">
                ACCOUNT INFORMATION
              </p>

              <h2>Personal Information</h2>
            </div>

            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="profile-info">

            <div className="profile-info-item">
              <span>Full Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="profile-info-item">
              <span>Email Address</span>
              <strong>{user?.email}</strong>
            </div>

          </div>

        </div>

        <div className="profile-card">

          <p className="profile-card-label">
            ACCOUNT MANAGEMENT
          </p>

          <h2>My Account</h2>

          <div className="profile-actions">

            <Link
              to="/orders"
              className="profile-action-button"
            >
              <span>
                <strong>My Orders</strong>
                <small>View your order history</small>
              </span>

              <span>→</span>
            </Link>

            <Link
              to="/wishlist"
              className="profile-action-button"
            >
              <span>
                <strong>My Wishlist</strong>
                <small>View your saved products</small>
              </span>

              <span>→</span>
            </Link>

          </div>

        </div>

        <div className="profile-logout-section">

          <button
            className="profile-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </section>

    </main>
  );
}

export default Profile;