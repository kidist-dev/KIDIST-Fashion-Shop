import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart</h1>
          <p>Your shopping cart is currently empty.</p>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">

      <section className="cart-header">
        <p>YOUR SHOPPING BAG</p>
        <h1>Shopping Cart</h1>
      </section>

      <div className="cart-container">

        {/* CART ITEMS */}
        <section className="cart-items">

          {cart.map((item) => (
            <div className="cart-item" key={item.cartId}>

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">

                <p className="cart-item-category">
                  {item.category}
                </p>

                <h2>{item.name}</h2>

                <p className="cart-item-price">
                  ${item.price}
                </p>

                <p>
                  Size: <strong>{item.selectedSize}</strong>
                </p>

                <p>
                  Color: <strong>{item.selectedColor}</strong>
                </p>

                {/* QUANTITY */}
                <div className="cart-quantity">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.cartId,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.cartId,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-cart-item"
                  onClick={() =>
                    removeFromCart(item.cartId)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

            </div>
          ))}

          <button
            className="clear-cart"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </section>


        {/* ORDER SUMMARY */}
        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>
              ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>
              ${totalPrice.toFixed(2)}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </aside>

      </div>

    </main>
  );
}

export default Cart;