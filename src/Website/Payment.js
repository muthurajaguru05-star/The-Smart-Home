import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Payment() {
  const navigate = useNavigate();

const handlePayment = () => {
  Swal.fire({
    title: "Payment Successful!",
    text: "Your order has been placed successfully.",
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#28a745",
  }).then(() => {
    const email = localStorage.getItem("email");

    if (email) {
      localStorage.removeItem(`cart_${email}`);
    }

    navigate("/");
  });
};
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Payment Page</h1>

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 25px",
          background: "green",
          color: "white",
          border: "none",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;