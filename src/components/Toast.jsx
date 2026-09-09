import { useCart } from "../context/CartContext";
import "./Toast.css";

function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast" role="status">
      <span className="toast__icon">✓</span>
      {toastMessage}
    </div>
  );
}

export default Toast;