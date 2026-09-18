import React, { useState } from "react";
import "../Website css/Webregister.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaUserTag, FaHome, FaShieldAlt, FaMagic, FaArrowRight, FaCheckCircle } from "react-icons/fa";

function Webregister() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(
        "http://localhost:5001/api/registers",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Account created successfully! Redirecting to login...",
        timer: 1500,
        showConfirmButton: false,
        background: "#1e293b",
        color: "#fff",
        iconColor: "#10b981"
      });

      setFormData({
        name: "",
        email: "",
        contact: "",
        password: "",
        role: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error);
      setIsSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message || "Something went wrong!",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });
    }
  };

  return (
    <div className="wholewebregister">
      {/* Background Animated Gradient Mesh & Particles */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>
      <div className="grid-overlay"></div>

      <div className="registercontainer">
        {/* LEFT SIDE - VISUAL & HERO BANNER */}
        <div className="registerleft">
          <div className="brand-header">
            <div className="brand-logo">
              <FaHome className="brand-icon" />
            </div>
            <span className="brand-title">SmartHome AI</span>
          </div>

          <div className="left-hero-content">
            <div className="live-badge">
              <span className="pulse-dot green"></span> Join 50,000+ Smart Homes
            </div>
            <h1>Start Your Smart Journey Today</h1>
            <p>
              Create your account to unlock instant control over your home's security, climate, and automated ambient lighting.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <FaMagic className="feat-icon" />
                <span>AI Automated Room Scenes</span>
              </div>
              <div className="feature-item">
                <FaShieldAlt className="feat-icon" />
                <span>Bank-Grade Privacy & Encryption</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feat-icon" />
                <span>Instant Multi-Device Sync</span>
              </div>
            </div>
          </div>

          {/* Floating Live Animation Orbs */}
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="hero-grid-pattern"></div>
        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="registerright">
          <form onSubmit={handleSubmit} className="registerform">
            <div className="form-header">
              <h2>Create Account</h2>
              <p className="form-subtitle">Fill in your details to set up your smart ecosystem</p>
            </div>

            {/* NAME */}
            <div className="formgroup">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-box">
                <FaUser className="input-icon" />
                <input
                  id="reg-name"
                  className="registerinput"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="formgroup">
              <label htmlFor="reg-email">Email Address</label>
              <div className="input-box">
                <FaEnvelope className="input-icon" />
                <input
                  id="reg-email"
                  className="registerinput"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* CONTACT */}
            <div className="formgroup">
              <label htmlFor="reg-contact">Contact Number</label>
              <div className="input-box">
                <FaPhone className="input-icon" />
                <input
                  id="reg-contact"
                  className="registerinput"
                  type="tel"
                  name="contact"
                  placeholder="+1 (555) 000-0000"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="formgroup">
              <label htmlFor="reg-password">Password</label>
              <div className="passwordwrapper">
                <FaLock className="input-icon" />
                <input
                  id="reg-password"
                  className="registerinput"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="showpasswordbtn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* ROLE */}
            <div className="formgroup">
              <label htmlFor="reg-role">Account Type</label>
              <div className="input-box">
                <FaUserTag className="input-icon" />
                <select
                  id="reg-role"
                  name="role"
                  className="registerinput select-input"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">Standard User</option>
                </select>
              </div>
            </div>

            <button type="submit" className={`webregisterbtn ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight className="btn-arrow" />
                </>
              )}
            </button>

            <p className="signup-text">
              Already have an account?{" "}
              <Link to="/login" className="highlight-link">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Webregister;
