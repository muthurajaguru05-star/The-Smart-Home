import React, { useEffect, useState } from "react";
import Navebar from "./Navebar";
import "../Website css/Webabout.css";
import aboutac from "../Website jpg/aboutac.jpg";
import applephone from "../Website jpg/applephone.jpg";
import abouttv from "../Website jpg/abouttv.jpg";
import FooterNavbar from "./FooterNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Webabout() {
  const navigate = useNavigate();

  // Dynamic state for live stats
  const [stats, setStats] = useState({
    products: 150,
    customers: 1200,
    orders: 850,
    satisfaction: 99,
  });

  useEffect(() => {
    // Fetch live product and order counts from API
    Promise.all([
      axios.get("http://localhost:5001/api/products").catch(() => null),
      axios.get("http://localhost:5001/api/orders").catch(() => null),
      axios.get("http://localhost:5001/api/users").catch(() => null),
    ]).then(([prodRes, orderRes, userRes]) => {
      setStats({
        products: prodRes?.data?.length || 150,
        orders: orderRes?.data?.length || 850,
        customers: userRes?.data?.length || 1200,
        satisfaction: 99,
      });
    });
  }, []);

  return (
    <>
      <Navebar />

      <div className="about-page-wrapper">
        {/* HERO SECTION */}
        <section className="about-hero-section">
          <div className="about-hero-content">
            <h1 className="about-hero-title">Empowering Modern Homes</h1>
            <p className="about-hero-subtitle">
              Welcome to <strong>The Smart Home</strong>. We deliver state-of-the-art smart home electronics, cutting-edge appliances, and premium mobile devices to make your lifestyle smarter, safer, and infinitely more comfortable.
            </p>
          </div>
        </section>

        {/* LIVE STATS COUNTER BAR */}
        <div className="stats-counter-bar">
          <div className="stat-box-card">
            <span className="stat-number">{stats.products}+</span>
            <span className="stat-label">Smart Products</span>
          </div>

          <div className="stat-box-card">
            <span className="stat-number">{stats.customers}+</span>
            <span className="stat-label">Happy Customers</span>
          </div>

          <div className="stat-box-card">
            <span className="stat-number">{stats.orders}+</span>
            <span className="stat-label">Completed Orders</span>
          </div>

          <div className="stat-box-card">
            <span className="stat-number">{stats.satisfaction}%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>

        {/* MISSION & VISION */}
        <section className="mission-vision-container">
          <div className="mv-card-box">
            <div className="mv-icon-badge">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <h3>Our Mission</h3>
            <p>
              To make modern smart home technology accessible to every household with uncompromised quality, transparent pricing, and 24/7 dedicated customer care.
            </p>
          </div>

          <div className="mv-card-box">
            <div className="mv-icon-badge">
              <i className="fa-solid fa-eye"></i>
            </div>
            <h3>Our Vision</h3>
            <p>
              To lead the home automation and electronic appliances industry by continually introducing innovative, energy-efficient, and durable solutions.
            </p>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-choose-section">
          <div className="section-header-title">
            <h2>Why Choose The Smart Home?</h2>
            <p>We combine quality products with world-class service to deliver an unmatched experience.</p>
          </div>

          <div className="features-grid-layout">
            <div className="feature-card-item">
              <div className="feature-icon-circle">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h4>100% Genuine</h4>
              <p>All products come with original brand warranties and official certificates.</p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-circle">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h4>Express Delivery</h4>
              <p>Fast, tracked shipping straight to your doorstep within 24–48 hours.</p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-circle">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h4>24/7 Support</h4>
              <p>Our dedicated support team is available round-the-clock to answer your queries.</p>
            </div>

            <div className="feature-card-item">
              <div className="feature-icon-circle">
                <i className="fa-solid fa-tags"></i>
              </div>
              <h4>Best Price Deals</h4>
              <p>Get exclusive discounts, seasonal sales, and unbeatable price matches.</p>
            </div>
          </div>
        </section>

        {/* CATEGORY HIGHLIGHT CARDS */}
        <section className="products-highlight-container">
          <div
            className="highlight-row-card"
            onClick={() =>
              navigate("/webproduct", {
                state: { category: "Air Conditioner" },
              })
            }
          >
            <div className="highlight-image-box">
              <img src={aboutac} alt="Air Conditioner" className="highlight-img" />
            </div>

            <div className="highlight-text-content">
              <h3>Smart Cooling & AC Solutions</h3>
              <p>
                Experience energy-efficient cooling with smart inverter technology, Wi-Fi mobile app controls, and ultra-quiet performance for your ultimate home comfort.
              </p>
              <button className="explore-category-btn">
                Explore AC Range <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div
            className="highlight-row-card"
            onClick={() =>
              navigate("/webproduct", {
                state: { category: "Mobile" },
              })
            }
          >
            <div className="highlight-text-content">
              <h3>Next-Gen Flagship Mobiles</h3>
              <p>
                Stay ahead with top-tier smartphones featuring advanced camera systems, lightning-fast processors, 5G connectivity, and sleek ergonomic designs.
              </p>
              <button className="explore-category-btn">
                Explore Mobiles <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="highlight-image-box">
              <img src={applephone} alt="Mobile Phone" className="highlight-img" />
            </div>
          </div>

          <div
            className="highlight-row-card"
            onClick={() =>
              navigate("/webproduct", {
                state: { category: "TV" },
              })
            }
          >
            <div className="highlight-image-box">
              <img src={abouttv} alt="Smart TV" className="highlight-img" />
            </div>

            <div className="highlight-text-content">
              <h3>Immersive 4K & QLED Smart TVs</h3>
              <p>
                Transform your living room into a cinematic theater with ultra-vibrant 4K HDR displays, Dolby Atmos sound, and seamless streaming integrations.
              </p>
              <button className="explore-category-btn">
                Explore Smart TVs <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>
      </div>

      <FooterNavbar />
    </>
  );
}

export default Webabout;