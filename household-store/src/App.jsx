
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import CartErrorBoundary from "./components/CartErrorBoundary";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import BuyNow from "./pages/BuyNow";
import NotFound from "./pages/NotFound";

// Protected route — only accessible if cart has items
function ProtectedBuyNow() {
  const { cart } = useCart();
  return cart.length > 0 ? <BuyNow /> : <Navigate to="/" />;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <CartErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/buy-now" element={<ProtectedBuyNow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartErrorBoundary>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;