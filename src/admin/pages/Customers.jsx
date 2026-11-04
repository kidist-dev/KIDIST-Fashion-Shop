
import { useState } from "react";

const initialCustomers = [
  {
    id: 1,
    name: "Sara Ahmed",
    email: "sara@example.com",
    phone: "+251 911 123 456",
    orders: 4,
    totalSpent: 520,
    status: "Active",
  },
  {
    id: 2,
    name: "Mimi Bekele",
    email: "mimi@example.com",
    phone: "+251 922 234 567",
    orders: 2,
    totalSpent: 240,
    status: "Active",
  },
  {
    id: 3,
    name: "Hana Tesfaye",
    email: "hana@example.com",
    phone: "+251 933 345 678",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
  },
];

function Customers() {
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem("kidist_admin_customers");
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  function saveCustomers(updatedCustomers) {
    setCustomers(updatedCustomers);
    localStorage.setItem(
      "kidist_admin_customers",
      JSON.stringify(updatedCustomers)
    );
  }

  function toggleStatus(customerId) {
    const updatedCustomers = customers.map((customer) =>
      customer.id === customerId
        ? {
            ...customer,
            status: customer.status === "Active" ? "Inactive" : "Active",
          }
        : customer
    );

    saveCustomers(updatedCustomers);
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search);

    const matchesStatus =
      filter === "All" || customer.status === filter;

    return matchesSearch && matchesStatus;
  });

  const totalSpent = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0
  );

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  return (
    <div className="admin-customers-page">
      <div className="admin-customers-heading">
        <div>
          <p className="admin-customers-eyebrow">CUSTOMER MANAGEMENT</p>
          <h1>Customers</h1>
          <p>Manage and review your KIDIST shop customers.</p>
        </div>
      </div>

      <div className="admin-customers-stats">
        <div className="admin-customer-stat">
          <span>Total Customers</span>
          <h2>{customers.length}</h2>
        </div>

        <div className="admin-customer-stat">
          <span>Active Customers</span>
          <h2>{activeCustomers}</h2>
        </div>

        <div className="admin-customer-stat">
          <span>Total Customer Spending</span>
          <h2>${totalSpent.toLocaleString()}</h2>
        </div>
      </div>

      <div className="admin-customers-panel">
        <div className="admin-customers-toolbar">
          <input
            type="text"
            placeholder="Search name, email, or phone..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">All Customers</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="admin-customers-table-wrapper">
          <table className="admin-customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="admin-customer-name">
                      <div className="admin-customer-avatar">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{customer.name}</strong>
                        <span>{customer.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{customer.phone}</td>
                  <td>{customer.orders}</td>
                  <td>${customer.totalSpent.toLocaleString()}</td>

                  <td>
                    <span
                      className={`admin-customer-status ${
                        customer.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="admin-customer-action"
                      onClick={() => toggleStatus(customer.id)}
                    >
                      {customer.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="admin-customers-empty">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Customers;
