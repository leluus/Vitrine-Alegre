import "./QuantityStepper.css";

function QuantityStepper({ quantity, onIncrease, onDecrease, size = "normal" }) {
  return (
    <div className={`stepper stepper--${size}`}>
      <button className="stepper__btn" onClick={onDecrease} aria-label="Diminuir quantidade">−</button>
      <span className="stepper__value">{quantity}</span>
      <button className="stepper__btn" onClick={onIncrease} aria-label="Aumentar quantidade">+</button>
    </div>
  );
}

export default QuantityStepper;