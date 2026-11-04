import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OrderDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const orders = JSON.parse(
    localStorage.getItem("lume_orders") || "[]"
  );

  const order = orders.find(
    (order) =>
      String(order.id) === String(id) &&
      order.userId === user?.id
  );

  if (!order) {
    return (
      <main className="order-details-page">
        <section className="order-not-found">
          <p className="order-details-label">
            MY ACCOUNT
          </p>

          <h1>Order Not Found</h1>

          <p>
            We couldn't find this order in your account.
          </p>

          <Link
            to="/orders"
            className="order-details-button"
          >
            Back to My Orders
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="order-details-page">

      {/* Header */}
      <section className="order-details-header">

        <p className="order-details-label">
          ORDER DETAILS
        </p>

        <h1>
          Order #{order.id}
        </h1>

        <p>
          Thank you for shopping with LUMÉ.
        </p>

      </section>

      <section className="order-details-container">

        {/* Order Status */}
        <div className="order-details-card">

          <div className="order-details-card-header">

            <div>
              <p className="order-details-small-label">
                ORDER STATUS
              </p>

              <h2>
                {order.status}
              </h2>
            </div>

            <div className="order-details-status">
              {order.status}
            </div>

          </div>

          <div className="order-details-date">

            <span>Order Date</span>

            <strong>
              {order.date}
            </strong>

          </div>

        </div>

        {/* Customer Information */}
        <div className="order-details-card">

          <p className="order-details-small-label">
            DELIVERY INFORMATION
          </p>

          <h2>
            Customer Information
          </h2>

          <div className="customer-details">

            <div>
              <span>Full Name</span>
              <strong>
                {order.customer?.fullName}
              </strong>
            </div>

            <div>
              <span>Phone Number</span>
              <strong>
                {order.customer?.phone}
              </strong>
            </div>

            <div>
              <span>City</span>
              <strong>
                {order.customer?.city}
              </strong>
            </div>

            <div>
              <span>Delivery Address</span>
              <strong>
                {order.customer?.address}
              </strong>
            </div>

          </div>

        </div>

        {/* Payment */}
        <div className="order-details-card">

          <p className="order-details-small-label">
            PAYMENT
          </p>

          <h2>
            Payment Information
          </h2>

          <div className="payment-details">

            <div>
              <span>Payment Method</span>

              <strong>
                {order.paymentMethod === "chapa"
                  ? "Chapa — Online Payment"
                  : "Cash on Delivery"}
              </strong>
            </div>

            <div>
              <span>Payment Status</span>

              <strong>
                {order.paymentMethod === "chapa"
                  ? "Payment Pending"
                  : "Pending"}
              </strong>
            </div>

          </div>

        </div>

        {/* Products */}
        <div className="order-details-card">

          <p className="order-details-small-label">
            ORDER ITEMS
          </p>

          <h2>
            Products
          </h2>

          <div className="order-details-products">

            {order.items.map((item) => (

              <div
                className="order-details-product"
                key={item.cartId}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="order-details-product-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Size: {item.selectedSize}
                  </p>

                  <p>
                    Color: {item.selectedColor}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>

                <strong>
                  $
                  {(item.price * item.quantity).toFixed(2)}
                </strong>

              </div>

            ))}

          </div>

          {/* Total */}
          <div className="order-details-total">

            <span>
              Total
            </span>

            <strong>
              ${order.total.toFixed(2)}
            </strong>

          </div>

        </div>

        {/* Back */}
        <div className="order-details-actions">

          <Link
            to="/orders"
            className="order-details-button"
          >
            ← Back to My Orders
          </Link>

          <Link
            to="/products"
            className="order-details-button secondary"
          >
            Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}

export default OrderDetails;