import { useEffect, useState } from "react";
import Admin from "./Admin";
import "./Adminpannel.css/Dashboard.css";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadAllStats = () => {
      fetchUsers();
      fetchProducts();
      fetchcategory();
      fetchOrders();
    };

    loadAllStats();
    const interval = setInterval(loadAllStats, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5001/api/registers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  const fetchcategory = () => {
    axios
      .get("http://localhost:5001/api/categores")
      .then((res) => setCategorys(res.data))
      .catch((err) => console.log(err));
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:5001/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const barData = [
    {
      name: "User",
      value: users.length
    },
    {
      name: "Products",
      value: products.length
    },
    {
      name: "Category",
      value: categorys.length
    },
    {
      name: "Sales Orders",
      value: orders.length
    }
  ];

  const pieData = [
    { name: "Users", value: users.length },
    { name: "Products", value: products.length },
    { name: "Category", value: categorys.length },
    { name: "Sales Orders", value: orders.length }
  ];

  const COLORS = ["#3498db", "#2ecc71", "#f39c12", "#e91e63"];

  return (
    <div className="layout">
      <Admin />

      <div className="main-content">

        <div className="dashboard-header">
          <i className="fa-solid fa-house"></i>
          <h2>Dashboard</h2>
        </div>

        <div className="box-container">

          <div className="card user-card">
            <h3>User</h3>
            <span>{users.length}</span>
          </div>

          <div className="card product-card">
            <h3>Product</h3>
            <span>{products.length}</span>
          </div>

          <div className="card category-card">
            <h3>Category</h3>
            <span>{categorys.length}</span>
          </div>

          <div className="card sales-card">
            <h3>Sales Orders</h3>
            <span>{orders.length}</span>
          </div>

        </div>

        <div className="chart-container">

          <div className="chart-box">

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3498db" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="chart-box">

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;