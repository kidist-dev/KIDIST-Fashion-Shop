
import { useState } from "react";

const initialOrders = [
  {
    id: "KID-1001",
    customer: "Abebe Customer",
    email: "customer@example.com",
    date: "2026-10-10",
    items: 2,
    total: 240,
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: "KID-1002",
    customer: "Sara Customer",
    email: "sara@example.com",
    date: "2026-10-11",
    items: 1,
    total: 120,
    status: "Processing",
    payment: "Paid",
  },
  {
    id: "KID-1003",
    customer: "Mimi Customer",
    email: "mimi@example.com",
    date: "2026-10-12",
    items: 3,
    total: 350,
    status: "Delivered",
    payment: "Paid",
  },
];

function Orders() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("kidist_admin_orders");
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem(
      "kidist_admin_orders",
      JSON.stringify(updatedOrders)
    );
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((order) => order.payment === "Paid")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div className="admin-products-page admin-orders-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-section-label">SALES MANAGEMENT</p>
          <h1>Orders</h1>
          <p>Manage and track customer orders for your KIDIST store.</p>
        </div>
      </div>

      <div className="admin-product-summary">
        <div className="admin-product-summary-card">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Pending Orders</span>
          <strong>{pendingOrders}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Delivered Orders</span>
          <strong>{completedOrders}</strong>
        </div>

        <div className="admin-product-summary-card">
          <span>Paid Revenue</span>
          <strong>ETB {totalRevenue.toLocaleString()}</strong>
        </div>
      </div>

      <section className="admin-product-table-card">
        <div className="admin-orders-toolbar">
          <div>
            <h2>All Orders</h2>
            <p>Review orders and update their progress.</p>
          </div>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order or customer..."
            aria-label="Search orders"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter orders by status"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="admin-table-scroll">
          <table className="admin-product-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>

                    <td>
                      <div className="admin-order-customer">
                        <strong>{order.customer}</strong>
                        <span>{order.email}</span>
                      </div>
                    </td>

                    <td>{order.date}</td>
                    <td>{order.items}</td>

                    <td>
                      ETB {Number(order.total || 0).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`admin-order-payment ${
                          order.payment === "Paid" ? "paid" : "unpaid"
                        }`}
                      >
                        {order.payment}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`admin-order-status status-${order.status.toLowerCase()}`}
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(order.id, event.target.value)
                        }
                        aria-label={`Update status for order ${order.id}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="admin-orders-empty">
                    No orders match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Orders;
