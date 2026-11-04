
import { useEffect, useState } from "react";
import "./Payments.css";

const BANK_KEY = "lume_bank_accounts";
const ORDER_KEY = "lume_orders";

const initialBanks = [];

function Payments() {
  const [banks, setBanks] = useState(() =>
    JSON.parse(localStorage.getItem(BANK_KEY) || "[]")
  );

  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem(ORDER_KEY) || "[]")
  );

  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");

  const emptyForm = {
    bankName: "",
    accountName: "",
    accountNumber: "",
    active: true,
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(BANK_KEY, JSON.stringify(banks));
  }, [banks]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }, [orders]);

  const saveBank = (e) => {
    e.preventDefault();

    if (
      !form.bankName.trim() ||
      !form.accountName.trim() ||
      !form.accountNumber.trim()
    ) {
      setMessage("Please complete all bank account fields.");
      return;
    }

    if (editingId !== null) {
      setBanks((previous) =>
        previous.map((bank) =>
          bank.id === editingId
            ? { ...bank, ...form }
            : bank
        )
      );
      setMessage("Bank account updated.");
    } else {
      setBanks((previous) => [
        ...previous,
        { ...form, id: Date.now() },
      ]);
      setMessage("Bank account added.");
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const editBank = (bank) => {
    setForm({
      bankName: bank.bankName,
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      active: bank.active,
    });
    setEditingId(bank.id);
    setShowForm(true);
    setMessage("");
  };

  const deleteBank = (id) => {
    const confirmed = window.confirm(
      "Remove this bank account?"
    );

    if (!confirmed) return;

    setBanks((previous) =>
      previous.filter((bank) => bank.id !== id)
    );
    setMessage("Bank account removed.");
  };

  const toggleBank = (id) => {
    setBanks((previous) =>
      previous.map((bank) =>
        bank.id === id
          ? { ...bank, active: !bank.active }
          : bank
      )
    );
  };

  const updatePayment = (orderId, approved, reason = "") => {
    setOrders((previous) =>
      previous.map((order) => {
        if (String(order.id) !== String(orderId)) {
          return order;
        }

        if (order.paymentMethod !== "bank") {
          return order;
        }

        return {
          ...order,
          paymentStatus: approved ? "Paid" : "Rejected",
          status: approved ? "Confirmed" : "Payment Rejected",
          payment: {
            ...order.payment,
            adminNote: reason,
            reviewedAt: new Date().toISOString(),
          },
        };
      })
    );

    setMessage(
      approved
        ? "Payment marked as approved in this browser."
        : "Payment marked as rejected in this browser."
    );
  };

  const paymentOrders = orders.filter(
    (order) => order.paymentMethod === "bank"
  );

  const filteredOrders = paymentOrders.filter((order) => {
    if (filter === "all") return true;

    if (filter === "pending") {
      return (
        order.paymentStatus === "Pending Verification" ||
        order.paymentStatus === "Pending"
      );
    }

    if (filter === "approved") {
      return order.paymentStatus === "Paid";
    }

    if (filter === "rejected") {
      return order.paymentStatus === "Rejected";
    }

    return true;
  });

  const pendingCount = paymentOrders.filter(
    (order) =>
      order.paymentStatus === "Pending Verification" ||
      order.paymentStatus === "Pending"
  ).length;

  return (
    <main className="admin-payments">
      <header className="payments-header">
        <div>
          <p className="payments-eyebrow">LUMÉ ADMINISTRATION</p>
          <h1>Payment Management</h1>
          <p>
            Manage bank accounts and review customer
            bank-transfer submissions.
          </p>
        </div>
      </header>

      {message && (
        <p className="payments-message" role="status">
          {message}
        </p>
      )}

      <section className="payment-stats">
        <article className="payment-stat">
          <span>Bank Accounts</span>
          <strong>{banks.length}</strong>
        </article>

        <article className="payment-stat">
          <span>Pending Reviews</span>
          <strong>{pendingCount}</strong>
        </article>

        <article className="payment-stat">
          <span>Total Transfers</span>
          <strong>{paymentOrders.length}</strong>
        </article>
      </section>

      <section className="admin-payment-section">
        <div className="section-heading">
          <div>
            <h2>Bank Accounts</h2>
            <p>Accounts available for customer transfers.</p>
          </div>

          <button
            className="admin-payment-btn"
            onClick={() => {
              setForm(emptyForm);
              setEditingId(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancel" : "+ Add Bank Account"}
          </button>
        </div>

        {showForm && (
          <form className="bank-form" onSubmit={saveBank}>
            <label>
              Bank Name
              <input
                value={form.bankName}
                onChange={(e) =>
                  setForm({ ...form, bankName: e.target.value })
                }
                placeholder="Enter bank name"
                required
              />
            </label>

            <label>
              Account Holder
              <input
                value={form.accountName}
                onChange={(e) =>
                  setForm({ ...form, accountName: e.target.value })
                }
                placeholder="Account holder name"
                required
              />
            </label>

            <label>
              Account Number
              <input
                value={form.accountNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    accountNumber: e.target.value,
                  })
                }
                placeholder="Enter account number"
                required
              />
            </label>

            <label className="bank-active-field">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Available at customer checkout
            </label>

            <button type="submit" className="admin-payment-btn">
              {editingId !== null ? "Save Changes" : "Add Account"}
            </button>
          </form>
        )}

        <div className="bank-list">
          {banks.length === 0 ? (
            <p className="payments-empty">
              No bank accounts added yet.
            </p>
          ) : (
            banks.map((bank) => (
              <article className="bank-card" key={bank.id}>
                <div className="bank-card-info">
                  <h3>{bank.bankName}</h3>
                  <p>{bank.accountName}</p>
                  <p>{bank.accountNumber}</p>
                  <span
                    className={
                      bank.active
                        ? "payment-status status-approved"
                        : "payment-status status-rejected"
                    }
                  >
                    {bank.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="bank-card-actions">
                  <button onClick={() => editBank(bank)}>
                    Edit
                  </button>

                  <button onClick={() => toggleBank(bank.id)}>
                    {bank.active ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    className="delete-bank-btn"
                    onClick={() => deleteBank(bank.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="admin-payment-section">
        <div className="section-heading">
          <div>
            <h2>Payment Verification</h2>
            <p>Review submitted bank-transfer payments.</p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter payments"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="payments-empty">
            No payments found for this filter.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <article className="transfer-card" key={order.id}>
              <div className="transfer-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>
                    {order.customer?.fullName || "Customer"}
                  </p>
                  <p>{order.customer?.phone || "No phone provided"}</p>
                </div>

                <strong>
                  {Number(order.total || 0).toFixed(2)}
                </strong>
              </div>

              <p>
                <strong>Transaction reference:</strong>{" "}
                {order.payment?.transactionReference || "Not provided"}
              </p>

              <p>
                <strong>Payment status:</strong>{" "}
                {order.paymentStatus || "Pending"}
              </p>

              {order.payment?.receiptDataUrl && (
                <a
                  href={order.payment.receiptDataUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="receipt-link"
                >
                  View payment screenshot
                </a>
              )}

              {(order.paymentStatus === "Pending Verification" ||
                order.paymentStatus === "Pending") && (
                <div className="transfer-actions">
                  <button
                    className="approve-payment-btn"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Have you checked the actual bank transaction and confirmed the amount was received?"
                      );

                      if (confirmed) {
                        updatePayment(order.id, true);
                      }
                    }}
                  >
                    Approve Payment
                  </button>

                  <button
                    className="reject-payment-btn"
                    onClick={() => {
                      const reason = window.prompt(
                        "Enter the reason for rejecting this payment:"
                      );

                      if (reason && reason.trim()) {
                        updatePayment(order.id, false, reason.trim());
                      }
                    }}
                  >
                    Reject Payment
                  </button>
                </div>
              )}

              {order.payment?.adminNote && (
                <p>
                  <strong>Admin note:</strong>{" "}
                  {order.payment.adminNote}
                </p>
              )}
            </article>
          ))
        )}
      </section>

      <p className="payments-warning">
        Prototype only: browser storage is not secure or shared
        across devices. Approvals here do not verify a bank
        transaction or securely confirm an order. Connect the
        backend before accepting real customer payments.
      </p>
    </main>
  );
}

export default Payments;
