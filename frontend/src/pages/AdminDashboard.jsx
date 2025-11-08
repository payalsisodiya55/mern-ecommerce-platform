import { useEffect, useState, useContext } from "react";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };
    if (token && user?.role === "admin") fetchStats();
  }, [token, user]);

  if (!user || user.role !== "admin")
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access Denied ❌</h2>
        <p>You must be an admin to view this page.</p>
      </div>
    );

  if (!stats)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Loading dashboard data...</h3>
      </div>
    );

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Dashboard 👑</h1>
      <p>Total Products: {stats.totalProducts}</p>
      <p>Total Orders: {stats.totalOrders}</p>
      <p>Total Revenue: ₹{stats.totalRevenue}</p>
      <p>Pending Orders: {stats.pendingOrders}</p>
    </div>
  );
}

export default AdminDashboard;
