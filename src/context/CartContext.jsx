import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, color, quantity) => {
    const newItem = {
      ...product,
      cartId: `${product.id}-${size}-${color}`,
      selectedSize: size,
      selectedColor: color,
      quantity: quantity,
    };

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.cartId === newItem.cartId
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.cartId === newItem.cartId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [...currentCart, newItem];
    });
  };

  const removeFromCart = (cartId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartId !== cartId)
    );
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}