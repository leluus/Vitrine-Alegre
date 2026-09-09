import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { translateCategory } from "../utils/categories";
import { formatBRL, formatInstallments } from "../utils/currency";
import QuantityStepper from "../components/QuantityStepper";
import "./Cart.css";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalItems, subtotal, totalDiscount, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <span className="cart-empty__icon">🛒</span>
        <h2>Seu carrinho está vazio</h2>
        <p>Escolha um produto na vitrine para começar.</p>
        <Link to="/" className="btn btn--primary">Ir para a vitrine</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <div>
          <h1>Seu carrinho</h1>
          <p className="cart__subtitle">
            {cartItems.length} produto{cartItems.length !== 1 ? "s" : ""} · {totalItems} unidade{totalItems !== 1 ? "s" : ""}
          </p>
        </div>
        <Link to="/" className="cart__continue">Continuar comprando ›</Link>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} className="cart-item__image" />

              <div className="cart-item__info">
                <span className="cart-item__category">{translateCategory(item.category)}</span>
                <p className="cart-item__title">{item.title}</p>
                <p className="cart-item__unit-price">{formatBRL(item.unitPrice)} cada</p>
              </div>

              <QuantityStepper
                size="small"
                quantity={item.quantity}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              />

              <p className="cart-item__subtotal">{formatBRL(item.unitPrice * item.quantity)}</p>

              <button
                className="cart-item__remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remover ${item.title}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <aside className="cart__summary">
          <h2>Resumo do pedido</h2>

          <div cl8assName="cart__summary-row">
            <span>Subtotal ({totalItems} {totalItems !== 1 ? "itens" : "item"})</span>
            <span>{formatBRL(subtotal)}</span>
          </div>

          {totalDiscount > 0 && (
            <div className="cart__summary-row cart__summary-row--discount">
              <span>Descontos</span>
              <span>− {formatBRL(totalDiscount)}</span>
            </div>
          )}

          <div className="cart__summary-row">
            <span>Frete</span>
            <span className="cart__free">Grátis</span>
          </div>

          <hr className="cart__divider" />

          <div className="cart__summary-total">
            <span>Total</span>
            <span>{formatBRL(totalPrice)}</span>
          </div>
          <p className="cart__installments">{formatInstallments(totalPrice)}</p>

          <button className="btn btn--primary cart__checkout">Finalizar compra</button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;