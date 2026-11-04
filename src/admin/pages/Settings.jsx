
import { useEffect, useState } from "react";
import "./Settings.css";

const defaultSettings = {
  storeName: "LUMÉ Fashion Shop",
  email: "",
  phone: "",
  address: "",
  currency: "USD",
  deliveryFee: "0",
  storeOpen: true,
};

function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("lume_store_settings") || "null"
      );

      if (saved) {
        setSettings({ ...defaultSettings, ...saved });
      }
    } catch {
      setSettings(defaultSettings);
    }
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const deliveryFee = Number(settings.deliveryFee);

    if (!Number.isFinite(deliveryFee) || deliveryFee < 0) {
      setMessage("Enter a valid, non-negative delivery fee.");
      return;
    }

    try {
      localStorage.setItem(
        "lume_store_settings",
        JSON.stringify({
          ...settings,
          deliveryFee: String(deliveryFee),
        })
      );

      setMessage("Settings saved successfully in this browser.");
    } catch {
      setMessage("Unable to save settings. Please try again.");
    }
  }

  return (
    <div className="admin-settings">
      <div className="settings-heading">
        <p className="settings-eyebrow">LUMÉ ADMINISTRATION</p>
        <h1>Store Settings</h1>
        <p>Manage your store's basic information and preferences.</p>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <section className="settings-section">
          <h2>Store information</h2>
          <p>Keep your shop's contact details up to date.</p>

          <div className="settings-grid">
            <label>
              Store name
              <input
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contact email
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="store@example.com"
              />
            </label>

            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Enter store phone"
              />
            </label>

            <label>
              Store address
              <input
                name="address"
                value={settings.address}
                onChange={handleChange}
                placeholder="City and address"
              />
            </label>
          </div>
        </section>

        <section className="settings-section">
          <h2>Shopping preferences</h2>
          <p>Set the currency label and delivery fee for your shop.</p>

          <div className="settings-grid">
            <label>
              Currency
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="USD">USD ($)</option>
                <option value="ETB">ETB (Br)</option>
              </select>
            </label>

            <label>
              Delivery fee
              <input
                type="number"
                name="deliveryFee"
                min="0"
                step="0.01"
                value={settings.deliveryFee}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="store-open-setting">
            <input
              type="checkbox"
              name="storeOpen"
              checked={settings.storeOpen}
              onChange={handleChange}
            />
            <span>
              <strong>Store is accepting orders</strong>
              <small>
                This preference is saved here; it does not yet block checkout.
              </small>
            </span>
          </label>
        </section>

        <div className="settings-actions">
          <button type="submit">Save settings</button>
          {message && <p role="status">{message}</p>}
        </div>
      </form>

      <p className="settings-warning">
        Prototype limitation: settings are saved in this browser only.
        A backend is needed to share settings with customers and other admins.
      </p>
    </div>
  );
}

export default Settings;
