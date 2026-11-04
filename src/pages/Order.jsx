import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Order() {
  const { user } = useAuth();

  const orders = JSON.parse(
    localStorage.getItem("lume_orders") || "[]"
  ).filter((order) => order.userId === user?.id);

  return (
    <main className="orders-page">

      {/* Header */}
      <section className="orders-header">
        <p className="orders-label">MY ACCOUNT</p>

        <h1>My Orders</h1>

        <p>
          View and manage your LUMÉ order history.
        </p>
      </section>

      {/* Orders */}
      <section className="orders-container">

        {orders.length === 0 ? (

          <div className="empty-orders">

            <div className="empty-orders-icon">
              ♡
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <Link
              to="/products"
              className="orders-shop-button"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => (

              <article
                className="order-card"
                key={order.id}
              >

                {/* Order Header */}
                <div className="order-card-header">

                  <div>
                    <p className="order-label">
                      ORDER
                    </p>

                    <h2>
                      #{order.id}
                    </h2>
                  </div>

                  <span className="order-status">
                    {order.status}
                  </span>

                </div>

                {/* Order Date */}
                <div className="order-date">
                  <span>Order Date</span>

                  <strong>
                    {order.date}
                  </strong>
                </div>

                {/* Products */}
                <div className="order-products">

                  {order.items.map((item) => (

                    <div
                      className="order-product"
                      key={item.cartId}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="order-product-info">

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
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                </div>
{/* Total */}
<div className="order-total">

  <span>
    Total
  </span>

  <strong>
    ${order.total.toFixed(2)}
  </strong>

</div>

{/* View Order */}
<div className="order-view-section">

  <Link
    to={`/orders/${order.id}`}
    className="view-order-button"
  >
    View Order
  </Link>

</div>

                </article>

                ))}

              </div>

         )}

      </section>

    </main>
  );
}

export default Order;