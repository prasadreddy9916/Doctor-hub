import { CheckCircle2, XCircle, X } from "lucide-react";
import "../styles/popup.css";

export default function PopupModal({ open, type = "success", title, message, onClose }) {
  if (!open) return null;
  const isSuccess = type === "success";
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-card ${isSuccess ? "popup-success" : "popup-error"}`} onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose} aria-label="Close"><X size={18}/></button>
        <div className="popup-icon">
          {isSuccess ? <CheckCircle2 size={56} strokeWidth={1.5}/> : <XCircle size={56} strokeWidth={1.5}/>}
        </div>
        <h3 className="popup-title">{title || (isSuccess ? "Success!" : "Oops!")}</h3>
        <p className="popup-message">{message}</p>
        <button className="popup-btn" onClick={onClose}>{isSuccess ? "Continue" : "Try Again"}</button>
      </div>
    </div>
  );
}