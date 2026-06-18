import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Kitchen", "Bedroom", "Bathroom", "Office"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>🏡 Modern Household Essentials</h1>

        <p style={styles.heroSubtitle}>
          Discover premium-quality products for every corner of your home.
        </p>

        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </section>

      <div style={styles.categoryRow}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              ...styles.categoryButton,
              backgroundColor: category === cat ? "#2563EB" : "#FFFFFF",
              color: category === cat ? "#FFFFFF" : "#2563EB",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 style={styles.heading}>✨ Featured Products</h2>

      <div style={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h2>No products found.</h2>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #F8FAFC, #E2E8F0)",
    padding: "30px",
  },

  hero: {
    background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
    borderRadius: "24px",
    padding: "70px 20px",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: "30px",
    boxShadow: "0 10px 30px rgba(37,99,235,0.25)",
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  heroSubtitle: {
    fontSize: "18px",
    marginBottom: "25px",
  },

  searchInput: {
    width: "100%",
    maxWidth: "500px",
    padding: "14px 20px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  },

  categoryRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  categoryButton: {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "2px solid #2563EB",
    cursor: "pointer",
    fontWeight: "600",
  },

  heading: {
    textAlign: "center",
    fontSize: "30px",
    color: "#1E3A8A",
    marginBottom: "25px",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
  },
};

export default Home;