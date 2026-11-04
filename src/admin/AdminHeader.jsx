
import { Link } from "react-router-dom";

function AdminHeader() {
  return (
    <header className="admin-header">
      <div>
        <p className="admin-header-eyebrow">KIDIST MANAGEMENT</p>
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-header-actions">
        <span className="admin-admin-label">Administrator</span>
        <Link to="/" className="admin-store-link">
          View Store ↗
        </Link>
      </div>
    </header>
  );
}

export default AdminHeader;
