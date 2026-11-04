
import { useState } from "react";

const defaultDiscounts = [
  {
    id: 1,
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    minOrder: 0,
    expiry: "2027-12-31",
    active: true,
  },
  {
    id: 2,
    code: "LUME20",
    type: "Percentage",
    value: 20,
    minOrder: 100,
    expiry: "2027-06-30",
    active: true,
  },
];

const emptyForm = {
  code: "",
  type: "Percentage",
  value: "",
  minOrder: "0",
  expiry: "",
  active: true,
};

function Discounts() {
  const [discounts, setDiscounts] = useState(() => {
    try {
      const saved = localStorage.getItem("kidist_admin_discounts");
      return saved ? JSON.parse(saved) : defaultDiscounts;
    } catch {
      return defaultDiscounts;
    }
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  function saveDiscounts(updated) {
    setDiscounts(updated);
    localStorage.setItem("kidist_admin_discounts", JSON.stringify(updated));
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function submitDiscount(event) {
    event.preventDefault();

    const code = form.code.trim().toUpperCase();
    const value = Number(form.value);
    const minOrder = Number(form.minOrder);

    if (!code || !form.expiry || value <= 0 || minOrder < 0) {
      alert("Please enter valid discount details.");
      return;
    }

    if (form.type === "Percentage" && value > 100) {
      alert("A percentage discount cannot exceed 100%.");
      return;
    }

    const duplicate = discounts.some(
      (item) =>
        item.code.toUpperCase() === code && item.id !== editingId
    );

    if (duplicate) {
      alert("This discount code already exists.");
      return;
    }

    const discount = {
      id: editingId ?? Date.now(),
      code,
      type: form.type,
      value,
      minOrder,
      expiry: form.expiry,
      active: form.active,
    };

    const updated = editingId
      ? discounts.map((item) => item.id === editingId ? discount : item)
      : [...discounts, discount];

    saveDiscounts(updated);
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function editDiscount(discount) {
    setForm({
      code: discount.code,
      type: discount.type,
      value: String(discount.value),
      minOrder: String(discount.minOrder),
      expiry: discount.expiry,
      active: discount.active,
    });
    setEditingId(discount.id);
    setShowForm(true);
  }

  function deleteDiscount(id) {
    if (!window.confirm("Delete this discount code?")) return;
    saveDiscounts(discounts.filter((item) => item.id !== id));
  }

  function toggleDiscount(id) {
    saveDiscounts(
      discounts.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  }

  const visibleDiscounts = discounts.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = discounts.filter((item) => item.active).length;

  return (
    <div className="admin-promo-page">
      <div className="admin-promo-heading">
        <div>
          <span className="admin-promo-eyebrow">SALES & PROMOTIONS</span>
          <h1>Discounts</h1>
          <p>Create offers and manage your discount codes.</p>
        </div>
        <button
          className="admin-promo-primary"
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "+ Create Discount"}
        </button>
      </div>

      <div className="admin-promo-stats">
        <div><span>Total Codes</span><strong>{discounts.length}</strong></div>
        <div><span>Active Codes</span><strong>{activeCount}</strong></div>
        <div><span>Inactive Codes</span><strong>{discounts.length - activeCount}</strong></div>
      </div>

      {showForm && (
        <form className="admin-promo-form" onSubmit={submitDiscount}>
          <h2>{editingId ? "Edit Discount" : "Create Discount"}</h2>

          <label>
            Discount Code
            <input
              name="code"
              value={form.code}
              onChange={updateField}
              placeholder="e.g. WELCOME10"
              required
            />
          </label>

          <label>
            Discount Type
            <select name="type" value={form.type} onChange={updateField}>
              <option>Percentage</option>
              <option>Fixed Amount</option>
            </select>
          </label>

          <label>
            Discount Value {form.type === "Percentage" ? "(%)" : "($)"}
            <input
              name="value"
              type="number"
              min="0.01"
              max={form.type === "Percentage" ? 100 : undefined}
              step="0.01"
              value={form.value}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Minimum Order Value ($)
            <input
              name="minOrder"
              type="number"
              min="0"
              step="0.01"
              value={form.minOrder}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Expiry Date
            <input
              name="expiry"
              type="date"
              value={form.expiry}
              onChange={updateField}
              required
            />
          </label>

          <label className="admin-promo-checkbox">
            <input
              name="active"
              type="checkbox"
              checked={form.active}
              onChange={updateField}
            />
            Activate this discount
          </label>

          <button className="admin-promo-primary" type="submit">
            {editingId ? "Save Changes" : "Create Discount"}
          </button>
        </form>
      )}

      <div className="admin-promo-table-panel">
        <div className="admin-promo-search">
          <input
            placeholder="Search discount code..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="admin-promo-table-scroll">
          <table className="admin-promo-table">
            <thead>
              <tr>
                <th>Code</th><th>Discount</th><th>Minimum Order</th>
                <th>Expiry</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleDiscounts.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.code}</strong></td>
                  <td>
                    {item.type === "Percentage"
                      ? `${item.value}%`
                      : `$${item.value}`}
                  </td>
                  <td>${Number(item.minOrder).toFixed(2)}</td>
                  <td>{item.expiry}</td>
                  <td>
                    <span className={`admin-promo-status ${item.active ? "on" : "off"}`}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-promo-actions">
                      <button onClick={() => editDiscount(item)}>Edit</button>
                      <button onClick={() => toggleDiscount(item.id)}>
                        {item.active ? "Deactivate" : "Activate"}
                      </button>
                      <button className="delete" onClick={() => deleteDiscount(item.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleDiscounts.length === 0 && (
                <tr><td colSpan="6">No discount codes found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Discounts;
