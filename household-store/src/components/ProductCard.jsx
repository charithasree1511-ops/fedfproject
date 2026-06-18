import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// CONTAINER + PRESENTER combined
function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);
  const qtyRef = useRef(null);

  function handleAddToCart() {
    addToCart({ ...product, qty: Number(qtyRef.current.value) || 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addToCart({ ...product, qty: Number(qtyRef.current.value) || 1 });
    navigate("/buy-now");
  }

  return (
    <div style={styles.card}>
      <img
        src={product.image}
        alt={product.name}
        style={styles.img}
      />

      <h3 style={styles.name}>{product.name}</h3>

      <p style={styles.category}>📦 {product.category}</p>

      <p style={styles.rating}>
        ⭐ {product.rating ? product.rating : "4.8"} / 5
      </p>

      <p style={styles.price}>₹{product.price}</p>

      <input
        ref={qtyRef}
        type="number"
        defaultValue={1}
        min={1}
        style={styles.qtyInput}
      />

      <div style={styles.btnRow}>
        <button
          onClick={handleAddToCart}
          style={styles.cartBtn}
        >
          {added ? "✅ Added!" : "🛒 Add to Cart"}
        </button>

        <button
          onClick={handleBuyNow}
          style={styles.buyBtn}
        >
          ⚡ Buy Now
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
    border: "1px solid #f1f5f9",
  },

  img: {
  width: "100%",
  height: "250px",
  objectFit: "contain",   
  borderRadius: "15px",
  marginBottom: "15px",
  backgroundColor: "#fff",
  padding: "10px",
},

  name: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },

  category: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "5px",
  },

  rating: {
    color: "#f59e0b",
    fontWeight: "600",
    marginBottom: "8px",
  },

  price: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "15px",
  },

  qtyInput: {
    width: "70px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "14px",
  },

  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  cartBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  buyBtn: {
    background: "#f97316",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ProductCard;