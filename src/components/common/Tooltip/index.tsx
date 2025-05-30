import './style.css';
import { RxCross2 } from "react-icons/rx";
import React, { useEffect, useState } from "react";

const Tooltip = ({
  type,
  typeText,
  close
}: {
  type: "success" | "error"
  typeText: string
  close: () => void
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(close, 500)
    }, 3000);
    return () => clearTimeout(timer)
  }, [close])

  return (
    <div className={`card ${visible ? "fade-in" : "fade-out"} ${type}`}>
      <div className="left-border-fill"></div>
      <div className="message-text-container">
        <p className="message-text">{type === 'error' ? 'Помилка' : 'Успіх'}</p>
        <p className="sub-text">{typeText}</p>
      </div>
      <div className="icon-container">
        <RxCross2 className="cross-icon" onClick={close} />
      </div>
    </div>
  );
};

export default Tooltip;
