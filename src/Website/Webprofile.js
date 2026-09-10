import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Website css/Webprofile.css";
import hardik from "../Website jpg/hardik.jpg";
import { useNavigate } from "react-router-dom";
import Navebar from "./Navebar";
import FooterNavbar from "./FooterNavbar";

function Webprofile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  const fetchUserProfile = () => {
    if (!email) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5001/api/profile/${email}`)
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading profile:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, [email]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5001/api/profile/${email}`,
        formData
      );

      if (res.data) {
        setUser(res.data);
        // Sync local storage
        if (res.data.name) localStorage.setItem("name", res.data.name);
        if (res.data.contact) localStorage.setItem("contact", res.data.contact);

        setIsEditing(false);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile details have been saved successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="loading-container" style={{ background: "#0f172a" }}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Navebar />

      <div className="profile-page">
        <div className="profile-card-modern">
          {/* LEFT SIDEBAR */}
          <div className="profile-left-modern">
            <div className="profile-avatar-wrapper">
              <img
                src={formData.avatar || hardik}
                alt="profile avatar"
                className="profile-avatar-img"
              />
            </div>

            <h2 style={{ fontSize: "24px", margin: "10px 0 4px 0", fontWeight: "700" }}>
              {user.name}
            </h2>

            <span className="user-role-badge">{user.role || "Customer"}</span>

            <p style={{ fontSize: "14px", opacity: 0.9, marginTop: "12px" }}>
              {user.email}
            </p>

            <button
              className="nav-orders-btn"
              onClick={() => navigate("/myorders")}
            >
              <i className="fa-solid fa-box-archive"></i> My Orders
            </button>
          </div>

          {/* RIGHT CONTENT PANEL */}
          <div className="profile-right-modern">
            <div>
              <div className="profile-header-row">
                <h1>User Profile</h1>
                {!isEditing ? (
                  <button
                    className="edit-toggle-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                  </button>
                ) : (
                  <button
                    className="cancel-edit-btn"
                    onClick={() => {
                      setFormData(user);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="profile-fields-grid">
                <div className="modern-info-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="modern-info-input"
                    required
                  />
                </div>

                <div className="modern-info-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    readOnly
                    className="modern-info-input"
                  />
                </div>

                <div className="modern-info-group">
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="modern-info-input"
                    required
                  />
                </div>

                <div className="modern-info-group">
                  <label>Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder={isEditing ? "Enter your default delivery address" : "Not specified"}
                    value={formData.address || ""}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="modern-info-input"
                  />
                </div>

                <div className="modern-info-group">
                  <label>Account Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role || "customer"}
                    readOnly
                    className="modern-info-input"
                  />
                </div>

                {isEditing && (
                  <div className="profile-action-bar">
                    <button type="submit" className="save-profile-btn">
                      <i className="fa-solid fa-check"></i> Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <FooterNavbar />
    </>
  );
}

export default Webprofile;