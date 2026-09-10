import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Logout() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to log out of the Admin Panel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "<i class='fa-solid fa-right-from-bracket'></i> Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "modern-swal-popup",
        confirmButton: "modern-swal-confirm",
        cancelButton: "modern-swal-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setLoggingOut(true);

        // Clear all admin tokens and stored user session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        sessionStorage.clear();

        // Brief smooth animation before redirection
        setTimeout(() => {
          Swal.fire({
            title: "Logged Out Successfully",
            text: "Redirecting to login...",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          }).then(() => {
            // Replace history entry so back button cannot return to admin panel
            navigate("/login", { replace: true });
          });
        }, 500);
      } else {
        // Return to previous page if cancelled
        navigate(-1);
      }
    });
  }, [navigate]);

  if (loggingOut) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          color: "white",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(255,255,255,0.2)",
            borderTopColor: "#10b981",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "20px",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "18px" }}>Securing Session & Logging Out...</h3>
      </div>
    );
  }

  return null;
}

export default Logout;