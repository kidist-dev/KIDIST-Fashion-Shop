
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: "▦" },
  { label: "Products", path: "/admin/products", icon: "◇" },
  { label: "Categories", path: "/admin/categories", icon: "▤" },
  { label: "Inventory", path: "/admin/inventory", icon: "▣" },
  { label: "Orders", path: "/admin/orders", icon: "🛍" },
  { label: "Customers", path: "/admin/customers", icon: "♙" },
  { label: "Payments", path: "/admin/payments", icon: "◇" },
  { label: "Gallery", path: "/admin/gallery", icon: "▧" },
  { label: "Discounts", path: "/admin/discounts", icon: "%" },
  { label: "Reports", path: "/admin/reports", icon: "▥" },
  { label: "Settings", path: "/admin/settings", icon: "⚙" },
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="admin-brand-name">KIDIST</span>
        <span className="admin-brand-subtitle">ADMIN PANEL</span>
      </div>

      <nav className="admin-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <span className="admin-status-dot" />
        Admin workspace
      </div>
    </aside>
  );
}

export default AdminSidebar;
