import { useEffect, useState, useContext } from "react";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Loading products...</h3>
      </div>
    );

  if (!products.length)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>No products found 😢</h3>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🛍️ All Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.images?.[0] || "https://via.placeholder.com/200"}
              alt={product.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>₹{product.price}</h4>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {user && user.role === "admin" && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <a
            href="/admin"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "green",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Go to Admin Dashboard 
          </a>
        </div>
      )}
    </div>
  );
}

export default Home;

