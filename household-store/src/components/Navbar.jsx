// PRESENTER component — only displays, no logic
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🏠 HomeStore</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/cart" style={styles.link}>
          🛒 Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 24px", backgroundColor: "#2c7a7b", color: "white" },
  brand: { color: "white", textDecoration: "none", fontSize: "22px", fontWeight: "bold" },
  links: { display: "flex", gap: "20px" },
  link: { color: "white", textDecoration: "none", fontSize: "16px" },
  badge: { backgroundColor: "red", color: "white", borderRadius: "50%",
    padding: "2px 7px", fontSize: "12px", marginLeft: "4px" },
};

export default Navbar;