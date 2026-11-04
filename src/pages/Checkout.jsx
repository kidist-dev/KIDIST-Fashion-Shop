
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: "",
    city: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [receipt, setReceipt] = useState(null);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Temporary bank details.
  // Later, these will come from the admin-managed backend.
  const bank = {
    name: "Your Bank Name",
    accountName: "LUMÉ Fashion Shop",
    accountNumber: "YOUR_ACCOUNT_NUMBER",
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: { pathname: "/checkout" },
        },
      });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReceiptChange = (e) => {
    const file = e.target.files?.[0];

    setError("");
    setReceipt(null);

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("The receipt image must be 2 MB or smaller.");
      e.target.value = "";
      return;
    }

    setReceipt(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim() ||
      !formData.address.trim()
    ) {
      setError("Please fill in all customer information.");
      return;
    }

    if (
      paymentMethod === "bank" &&
      (!receipt || !reference.trim())
    ) {
      setError(
        "Upload your payment screenshot and enter the transaction reference."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // DEMO ONLY:
      // Store the receipt image locally for frontend testing.
      // Production receipt uploads must use the backend.
      let receiptDataUrl = null;

      if (paymentMethod === "bank") {
        receiptDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = () =>
            reject(new Error("Unable to read the receipt image."));

          reader.readAsDataURL(receipt);
        });
      }

      const newOrder = {
        id: Date.now(),
        userId: user.id,

        customer: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          city: formData.city.trim(),
          address: formData.address.trim(),
        },

        items: cart.map((item) => ({ ...item })),
        total: totalPrice,
        paymentMethod,

        paymentStatus:
          paymentMethod === "bank"
            ? "Pending Verification"
            : "Unpaid",

        status: "Pending",

        payment: {
          bankName: paymentMethod === "bank" ? bank.name : null,
          accountName:
            paymentMethod === "bank" ? bank.accountName : null,
          transactionReference:
            paymentMethod === "bank" ? reference.trim() : null,
          receiptDataUrl,
          submittedAt:
            paymentMethod === "bank"
              ? new Date().toISOString()
              : null,
        },

        date: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString(),
      };

      // Temporary localStorage demo.
      // Replace this with a secure backend API later.
      const existingOrders = JSON.parse(
        localStorage.getItem("lume_orders") || "[]"
      );

      existingOrders.push(newOrder);

      localStorage.setItem(
        "lume_orders",
        JSON.stringify(existingOrders)
      );

      setSubmittedOrder(newOrder);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      setError(err.message || "Unable to submit your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="order-success">
          <div className="success-icon">✓</div>

          <h1>Order Submitted Successfully!</h1>

          <p>
            Thank you, {submittedOrder?.customer.fullName}.
            Your order has been submitted.
          </p>

          {paymentMethod === "bank" ? (
            <>
              <p>
                Payment Status:{" "}
                <strong>Pending Verification</strong>
              </p>

              <p>
                Our admin must verify your bank transaction
                before your payment and order can be confirmed.
              </p>
            </>
          ) : (
            <p>
              Payment Method: <strong>Cash on Delivery</strong>
            </p>
          )}

          <Link to="/orders" className="checkout-btn">
            View My Orders
          </Link>

          <Link to="/products" className="checkout-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Your Cart Is Empty</h1>
          <p>Add a product before proceeding to checkout.</p>
          <Link to="/products" className="checkout-btn">
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <p className="checkout-label">SECURE CHECKOUT</p>
        <h1>Checkout</h1>
      </section>

      <div className="checkout-container">
        <section className="checkout-form">
          <h2>Customer Information</h2>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                rows="4"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="payment-section">
              <h2>Payment Method</h2>

              <p className="payment-description">
                Select how you want to pay for your order.
              </p>

              <label
                className={
                  paymentMethod === "bank"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setError("");
                  }}
                />

                <div className="payment-option-content">
                  <strong>Manual Bank Transfer</strong>
                  <span>
                    Transfer money and upload your receipt.
                  </span>
                </div>
              </label>

              {paymentMethod === "bank" && (
                <div className="bank-transfer-details">
                  <h3>Bank Account Details</h3>

                  <p>
                    <strong>Bank:</strong> {bank.name}
                  </p>

                  <p>
                    <strong>Account Name:</strong>{" "}
                    {bank.accountName}
                  </p>

                  <p>
                    <strong>Account Number:</strong>{" "}
                    {bank.accountNumber}
                  </p>

                  <p>
                    <strong>Transfer Amount:</strong>{" "}
                    ${totalPrice.toFixed(2)}
                  </p>

                  <p className="payment-description">
                    Transfer the exact amount, then upload your
                    receipt. Replace these example bank details
                    with the account configured by your admin.
                  </p>

                  <div className="form-group">
                    <label htmlFor="reference">
                      Transaction Reference
                    </label>

                    <input
                      id="reference"
                      value={reference}
                      onChange={(e) =>
                        setReference(e.target.value)
                      }
                      placeholder="Enter transaction reference"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="receipt">
                      Payment Screenshot
                    </label>

                    <input
                      id="receipt"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleReceiptChange}
                      required
                    />

                    {receipt && (
                      <p>
                        Selected: {receipt.name}
                      </p>
                    )}
                  </div>

                  <p className="payment-description">
                    Your payment will remain pending until the
                    admin verifies the transaction.
                  </p>
                </div>
              )}

              <label
                className={
                  paymentMethod === "cash"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setError("");
                  }}
                />

                <div className="payment-option-content">
                  <strong>Cash on Delivery</strong>
                  <span>Pay when your order arrives.</span>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : paymentMethod === "bank"
                  ? "Submit Payment Proof"
                  : "Place Order"}
            </button>
          </form>
        </section>

        <section className="order-summary">
          <h2>Order Summary</h2>

          <div className="checkout-products">
            {cart.map((item) => (
              <div
                className="checkout-product"
                key={item.cartId}
              >
                <img src={item.image} alt={item.name} />

                <div className="checkout-product-info">
                  <h3>{item.name}</h3>
                  <p>Size: {item.selectedSize}</p>
                  <p>Color: {item.selectedColor}</p>
                  <p>Quantity: {item.quantity}</p>

                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
