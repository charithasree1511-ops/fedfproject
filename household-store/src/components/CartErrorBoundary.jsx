import { Component } from "react";

// Error Boundary - must be a class component
class CartErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Cart error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", backgroundColor: "#fff5f5", borderRadius: "8px",
          textAlign: "center", color: "#e53e3e" }}>
          <h3>⚠️ Something went wrong in the Cart.</h3>
          <button onClick={() => this.setState({ hasError: false })}
            style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default CartErrorBoundary;