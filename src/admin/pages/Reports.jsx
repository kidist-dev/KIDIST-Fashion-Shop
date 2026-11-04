
import { useEffect, useMemo, useState } from "react";
import "./Reports.css";

function Reports() {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    function loadOrders() {
      try {
        const savedOrders = JSON.parse(
          localStorage.getItem("lume_orders") || "[]"
        );
        setOrders(Array.isArray(savedOrders) ? savedOrders : []);
      } catch {
        setOrders([]);
      }
    }

    loadOrders();
    window.addEventListener("focus", loadOrders);

    return () => window.removeEventListener("focus", loadOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const rawDate = order.createdAt || order.date;
      const date = rawDate ? new Date(rawDate) : null;

      if (!date || Number.isNaN(date.getTime())) return true;

      const day = date.toISOString().slice(0, 10);

      return (
        (!startDate || day >= startDate) &&
        (!endDate || day <= endDate)
      );
    });
  }, [orders, startDate, endDate]);

  const isPaid = (order) => {
    const paymentStatus = String(order.paymentStatus || "").toLowerCase();
    const status = String(order.status || "").toLowerCase();

    return (
      paymentStatus === "paid" ||
      (order.paymentMethod === "cash" &&
        ["completed", "delivered"].includes(status))
    );
  };

  const revenue = filteredOrders.reduce(
    (sum, order) => sum + (isPaid(order) ? Number(order.total) || 0 : 0),
    0
  );

  const pendingPayments = filteredOrders.filter((order) =>
    ["pending verification", "payment pending"].includes(
      String(order.paymentStatus || "").toLowerCase()
    )
  ).length;

  const completedOrders = filteredOrders.filter((order) =>
    ["completed", "delivered"].includes(
      String(order.status || "").toLowerCase()
    )
  ).length;

  const productSales = {};

  filteredOrders.forEach((order) => {
    if (!Array.isArray(order.items)) return;

    order.items.forEach((item) => {
      const name = item.name || item.title || "Unnamed product";
      productSales[name] =
        (productSales[name] || 0) + (Number(item.quantity) || 1);
    });
  });

  const bestSellers = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="admin-reports">
      <div className="reports-heading">
        <div>
          <p className="reports-eyebrow">LUMÉ ADMINISTRATION</p>
          <h1>Sales Reports</h1>
          <p>Review your shop's orders, revenue and products.</p>
        </div>
      </div>

      <div className="reports-filters">
        <label>
          From
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label>
          To
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear dates
        </button>
      </div>

      <div className="reports-stats">
        <article className="report-stat">
          <span>Total orders</span>
          <strong>{filteredOrders.length}</strong>
        </article>

        <article className="report-stat">
          <span>Recorded paid revenue</span>
          <strong>{formatMoney(revenue)}</strong>
        </article>

        <article className="report-stat">
          <span>Completed orders</span>
          <strong>{completedOrders}</strong>
        </article>

        <article className="report-stat">
          <span>Payments awaiting verification</span>
          <strong>{pendingPayments}</strong>
        </article>
      </div>

      <section className="report-panel">
        <h2>Recent orders</h2>

        {filteredOrders.length === 0 ? (
          <p className="report-empty">No orders found for this period.</p>
        ) : (
          <div className="report-table-wrap">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Order status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>
                      {order.customer?.fullName || "Customer"}
                    </td>
                    <td>
                      {new Date(
                        order.createdAt || order.date
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {order.paymentStatus ||
                        (order.paymentMethod === "cash"
                          ? "Unpaid"
                          : "Not recorded")}
                    </td>
                    <td>{order.status || "Pending"}</td>
                    <td>{formatMoney(Number(order.total) || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="report-panel">
        <h2>Best-selling products</h2>

        {bestSellers.length === 0 ? (
          <p className="report-empty">No product sales recorded yet.</p>
        ) : (
          <div className="best-sellers">
            {bestSellers.map(([name, quantity]) => (
              <div className="best-seller-row" key={name}>
                <span>{name}</span>
                <strong>{quantity} sold</strong>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="report-note">
        Prototype report: figures come from this browser's local storage.
        Confirmed revenue is based on recorded payment and order statuses,
        not a live bank connection.
      </p>
    </div>
  );
}

export default Reports;
