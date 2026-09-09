import { createContext, useContext, useState, useRef } from "react";
import { getPricing } from "../utils/pricing";

const CartContext = createContext(null);
const TOAST_DURATION = 2500;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  function showToast(message) {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), TOAST_DURATION);
  }

  function addToCart(product, quantity = 1) {
    const { originalBRL, discountedBRL } = getPricing(product);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          category: product.category,
          thumbnail: product.thumbnail,
          originalPrice: originalBRL,
          unitPrice: discountedBRL,
          quantity,
        },
      ];
    });

    showToast(`${product.title} adicionado ao carrinho`);
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalDiscount = subtotal - totalPrice;

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    totalDiscount,
    totalPrice,
    toastMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa ser usado dentro de um CartProvider");
  }
  return context;
}