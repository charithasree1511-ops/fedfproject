import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1 style={{ fontSize: "64px" }}>404</h1>
      <h2>Page Not Found</h2>
      <button onClick={() => navigate("/")}
        style={{ padding: "10px 24px", backgroundColor: "#2c7a7b", color: "white",
          border: "none", borderRadius: "8px", cursor: "pointer" }}>
        Go Home
      </button>
    </div>
  );
}

export default NotFound;