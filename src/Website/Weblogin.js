import React, { useEffect, useState } from "react";
import "../Website css/Webregister.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHome, FaShieldAlt, FaBolt, FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function LoginForm() {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/registers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to load users",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#3b82f6"
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const user = users.find(
        (item) =>
          item.email === formData.email &&
          item.password === formData.password
      );

      if (!user) {
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid Email or Password",
          background: "#1e293b",
          color: "#fff",
          confirmButtonColor: "#ef4444"
        });
        return;
      }

      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      localStorage.setItem("contact", user.contact);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Logging in as ${user.name}...`,
        timer: 1500,
        showConfirmButton: false,
        background: "#1e293b",
        color: "#fff",
        iconColor: "#10b981"
      });

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
    }, 600);
  };

  return (
    <div className="wholelogin">
      {/* Background Animated Gradient Mesh & Particles */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>
      <div className="grid-overlay"></div>

      <div className="login-container">
        {/* LEFT SIDE - VISUAL & HERO BANNER */}
        <div className="login-left">
          <div className="brand-header">
            <div className="brand-logo">
              <FaHome className="brand-icon" />
            </div>
            <span className="brand-title">SmartHome AI</span>
          </div>

          <div className="left-hero-content">
            <div className="live-badge">
              <span className="pulse-dot"></span> Smart Ecosystem Connected
            </div>
            <h1>Control Your Smart World</h1>
            <p>
              Seamlessly monitor, automate, and protect your living space with next-generation smart home intelligent controls.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <FaShieldAlt className="feat-icon" />
                <span>Encrypted Security & Bio-Auth</span>
              </div>
              <div className="feature-item">
                <FaBolt className="feat-icon" />
                <span>Real-Time Device Monitoring</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feat-icon" />
                <span>Automated Energy Savings</span>
              </div>
            </div>
          </div>

          {/* Floating Live Animation Orbs & Rings */}
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="floating-orb orb-3"></div>
          <div className="hero-grid-pattern"></div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="login-right">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p className="form-subtitle">Please enter your credentials to access your dashboard</p>
            </div>

            <div className="input-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="input-box">
                <FaEnvelope className="input-icon" />
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="name@smarthome.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="login-password"
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

            <div className="options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button className={`webloginbtn ${isSubmitting ? "loading" : ""}`} type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="btn-arrow" />
                </>
              )}
            </button>

            <p className="signup-text">
              Don't have an account?{" "}
              <Link to="/register" className="highlight-link">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}