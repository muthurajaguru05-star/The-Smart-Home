import React, { useEffect, useState } from "react";
import axios from "axios";
import Navebar from "./Navebar";
import FooterNavbar from "./FooterNavbar";
import "../Website css/Order.css";

function Myorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("name") || "";
  const userEmail = localStorage.getItem("email") || "";

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get("http://localhost:5001/api/orders")
        .then((res) => {
          const allOrders = res.data;
          const userOrders = allOrders.filter((order) => {
            const matchName =
              username &&
              order.name &&
              order.name.trim().toLowerCase() === username.trim().toLowerCase();
            const matchEmail =
              userEmail &&
              order.email &&
              order.email.trim().toLowerCase() === userEmail.trim().toLowerCase();
            return matchName || matchEmail;
          });
          setOrders(userOrders);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching orders:", err);
          setLoading(false);
        });
    };

    fetchOrders();
    // Real-time live update poll every 3 seconds
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [username, userEmail]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-badge status-delivered";
      case "Out for Delivery":
        return "status-badge status-out-for-delivery";
      case "Preparing":
        return "status-badge status-preparing";
      case "Confirmed":
        return "status-badge status-confirmed";
      default:
        return "status-badge status-pending";
    }
  };

  return (
    <>
      <Navebar />

      <div className="myorders-container">
        <div className="myorders-wrapper">
          {/* HEADER */}
          <div className="myorders-header">
            <h1>
              <i className="fa-solid fa-bag-shopping"></i> My Orders (
              {username || userEmail || "Customer"})
            </h1>

            <div className="live-indicator">
              <span className="live-dot"></span>
              Live Sync
            </div>
          </div>

          {/* LOADING STATE */}
          {loading ? (
            <div className="orders-loader-container">
              <div className="spinner"></div>
              <p style={{ marginTop: "15px", color: "#64748b", fontWeight: "500" }}>
                Loading your orders...
              </p>
            </div>
          ) : orders.length > 0 ? (
            /* ORDERS LIST */
            orders.map((order, index) => (
              <div
                key={order._id || index}
                className="order-card-modern"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* CARD HEADER */}
                <div className="order-card-header">
                  <div className="order-meta-info">
                    <span className="order-number-date">
                      Order #{orders.length - index} &bull; Placed on{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </span>
                    <span className="order-details-meta">
                      Payment: <strong>{order.paymentMethod || "COD"}</strong> &bull; Address:{" "}
                      {order.address}
                    </span>
                  </div>

                  <div className="order-card-summary">
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status || "Pending"}
                    </span>
                    <div>
                      <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>
                        Total Amount
                      </span>
                      <span className="order-total-price">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS LIST */}
                <div className="order-products-section">
                  <h3 className="order-products-title">
                    Items Purchased ({order.items ? order.items.length : 0})
                  </h3>

                  <div className="products-grid">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="product-row-card">
                          <div className="product-main-info">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="product-thumb"
                            />
                            <div>
                              <h4 className="product-title-text">{item.title}</h4>
                              <span className="product-unit-price">
                                Unit Price: <strong>₹{item.price}</strong>
                              </span>
                            </div>
                          </div>

                          <div className="product-qty-box">
                            <span className="product-qty-label">Quantity</span>
                            <span className="product-qty-val">{item.qty}</span>
                          </div>

                          <div className="product-subtotal-box">
                            <span className="product-subtotal-label">Subtotal</span>
                            <span className="product-subtotal-val">
                              ₹{item.price * item.qty}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ color: "#94a3b8" }}>No products in this order</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="empty-orders-card">
              <i className="fa-solid fa-box-open"></i>
              <h2>No Orders Placed Yet</h2>
              <p>When you purchase products, your live orders will appear here!</p>
            </div>
          )}
        </div>
      </div>

      <FooterNavbar />
    </>
  );
}

export default Myorders;