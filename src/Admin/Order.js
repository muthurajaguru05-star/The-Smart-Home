import Admin from "./Admin";
import "./Adminpannel.css/Order.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Order() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const fetchOrders = () => {
    axios
      .get("http://localhost:5001/api/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log("Error fetching orders: ", err));
  };

  useEffect(() => {
    fetchOrders();
    // Real-time auto update every 4 seconds without requiring manual refresh
    const interval = setInterval(() => {
      fetchOrders();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(`http://localhost:5001/api/orders/${orderId}/status`, {
        status: newStatus,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `Order status updated to ${newStatus}`,
          timer: 1500,
          showConfirmButton: false,
        });
        fetchOrders();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: err.message,
        });
      });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f39c12";
      case "Confirmed":
        return "#3498db";
      case "Preparing":
        return "#9b59b6";
      case "Out for Delivery":
        return "#e67e22";
      case "Delivered":
        return "#2ecc71";
      default:
        return "#34495e";
    }
  };

  return (
    <div className="mainorder">
      <div className="sidebar">
        <Admin />
      </div>

      <div className="ordercontent">
        <div className="ordercontent-top">
          <div className="totalorders">
            <span>Total Orders</span>
            <h2>{orders.length}</h2>
          </div>

          <div className="wholeorder">
            <i className="fa-solid fa-bag-shopping"></i>
            <h2>CUSTOMER ORDERS</h2>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-scroll-area">
            <table className="ordertable">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Order Date & Time</th>
                  <th>Delivery Address</th>
                  <th>Order Status</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <tr key={order._id || index}>
                      <td>{indexOfFirstOrder + index + 1}</td>
                      <td>
                        <strong>{order.name}</strong>
                        <br />
                        <small style={{ color: "#64748b" }}>{order.email || ""}</small>
                      </td>
                      <td>{order.contact}</td>
                      <td style={{ textAlign: "left", minWidth: "220px" }}>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "6px",
                                borderBottom: i !== order.items.length - 1 ? "1px dashed #e2e8f0" : "none",
                                paddingBottom: "4px",
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                  width: "38px",
                                  height: "38px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  border: "1px solid #e2e8f0",
                                }}
                              />
                              <div>
                                <span style={{ fontSize: "13px", fontWeight: "600", display: "block" }}>
                                  {item.title}
                                </span>
                                <span style={{ fontSize: "12px", color: "#64748b" }}>
                                  Qty: {item.qty} × ${item.price}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span>No Products</span>
                        )}
                      </td>
                      <td style={{ fontWeight: "700", color: "#10b981" }}>
                        ${order.totalAmount}
                      </td>
                      <td>
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            background: "#f1f5f9",
                            fontWeight: "600",
                            fontSize: "12px",
                            color: "#334155",
                          }}
                        >
                          {order.paymentMethod || "COD"}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: "13px" }}>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString("en-US", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "N/A"}
                        </span>
                      </td>
                      <td style={{ maxWidth: "180px", fontSize: "13px" }}>
                        {order.address}
                      </td>
                      <td>
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            color: "white",
                            backgroundColor: getStatusColor(order.status || "Pending"),
                            border: "none",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <option value="Pending" style={{ color: "#333", background: "#fff" }}>
                            Pending
                          </option>
                          <option value="Confirmed" style={{ color: "#333", background: "#fff" }}>
                            Confirmed
                          </option>
                          <option value="Preparing" style={{ color: "#333", background: "#fff" }}>
                            Preparing
                          </option>
                          <option value="Out for Delivery" style={{ color: "#333", background: "#fff" }}>
                            Out for Delivery
                          </option>
                          <option value="Delivered" style={{ color: "#333", background: "#fff" }}>
                            Delivered
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No Orders Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination-barorder">
              <button
                className="page-btnorder"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <i className="fa-solid fa-chevron-left"></i> Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-btnorder ${currentPage === index + 1 ? "active-page" : ""}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="page-btnorder"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;