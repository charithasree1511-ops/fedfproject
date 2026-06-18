import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>🛒 Your cart is empty</h2>
        <button onClick={() => navigate("/")} style={styles.btn}>Shop Now</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2>🛒 Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={styles.item}>
          <img src={item.image} alt={item.name} style={styles.img} />
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>₹{item.price} × {item.qty} = ₹{item.price * item.qty}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>❌ Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={() => navigate("/buy-now")} style={styles.buyBtn}>⚡ Proceed to Buy</button>
        <button onClick={clearCart} style={styles.clearBtn}>🗑️ Clear Cart</button>
      </div>
    </div>
  );
}

const styles = {
  item: { display: "flex", alignItems: "center", gap: "16px", padding: "12px",
    borderBottom: "1px solid #eee" },
  img: { width: "60px", borderRadius: "6px" },
  removeBtn: { backgroundColor: "#e53e3e", color: "white", border: "none",
    padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
  btn: { padding: "10px 24px", backgroundColor: "#2c7a7b", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer" },
  buyBtn: { padding: "10px 20px", backgroundColor: "#e07b39", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer" },
  clearBtn: { padding: "10px 20px", backgroundColor: "#718096", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer" },
};

export default CartPage;