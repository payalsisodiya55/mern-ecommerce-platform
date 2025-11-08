import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cart.length)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Go to Home
        </button>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🛍️ Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <p>
            Quantity:{" "}
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              -
            </button>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              +
            </button>
          </p>
          <button
            onClick={() => removeFromCart(item._id)}
            style={{ color: "red", border: "none", background: "none" }}
          >
            Remove ❌
          </button>
        </div>
      ))}

      <h3 style={{ textAlign: "center" }}>Total: ₹{total}</h3>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/checkout")}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Proceed to Checkout 💳
        </button>
        <br />
        <button
          onClick={clearCart}
          style={{
            marginTop: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Clear Cart 🧹
        </button>
      </div>
    </div>
  );
}

export default Cart;
