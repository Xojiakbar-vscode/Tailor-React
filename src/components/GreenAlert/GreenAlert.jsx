import React, { useEffect } from "react";
import "./GreenAlert.css";

const GreenAlert = ({ show, message = "", position = "right", duration = 3000, onClose }) => {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;

  // position: "left" yoki "right"
  const cls = `green-alert ${position === "left"  ? "from-left" : "from-right"}`;

  return (
    <div className={cls} role="status" aria-live="polite" aria-atomic="true">
      <div className="green-alert__content">
        <span className="green-alert__dot" />
        <div className="green-alert__text">{message}</div>
        <button className="green-alert__close" onClick={() => onClose && onClose()} aria-label="Yopish">
          ×
        </button>
      </div>
    </div>
  );
};

export default GreenAlert;
