import { useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function BuyNow() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Controlled inputs for form validation
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  // Uncontrolled ref for optional notes
  const notesRef = useRef(null);

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter valid 10-digit phone";
    return newErrors;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    console.log("Order placed!", form, "Notes:", notesRef.current.value);
    clearCart();
    setOrdered(true);
  }

  if (ordered) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you, {form.name}! Your items will be delivered to {form.address}.</p>
        <button onClick={() => navigate("/")} style={styles.btn}>Continue Shopping</button>
      </div>
    );
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div style={{ padding: "24px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>⚡ Buy Now</h2>

      <div style={styles.summary}>
        {cart.map((i) => <p key={i.id}>{i.name} × {i.qty} — ₹{i.price * i.qty}</p>)}
        <strong>Total: ₹{total}</strong>
      </div>

      <h3>Delivery Details</h3>

      {/* Controlled inputs with validation */}
      {["name", "address", "phone"].map((field) => (
        <div key={field} style={{ marginBottom: "14px" }}>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            style={{ ...styles.input, borderColor: errors[field] ? "red" : "#ccc" }}
          />
          {errors[field] && <p style={styles.error}>{errors[field]}</p>}
        </div>
      ))}

      {/* Uncontrolled input for notes */}
      <textarea ref={notesRef} placeholder="Optional delivery notes..." style={styles.textarea} />

      <button onClick={handleSubmit} style={styles.btn}>✅ Place Order</button>
    </div>
  );
}

const styles = {
  summary: { backgroundColor: "#f0fff4", padding: "12px", borderRadius: "8px", marginBottom: "16px" },
  input: { width: "100%", padding: "10px", borderRadius: "6px",
    border: "1px solid #ccc", fontSize: "14px", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc",
    marginBottom: "16px", fontSize: "14px", height: "80px", boxSizing: "border-box" },
  error: { color: "red", fontSize: "12px", margin: "4px 0 0" },
  btn: { padding: "12px 28px", backgroundColor: "#2c7a7b", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "15px" },
};

export default BuyNow;