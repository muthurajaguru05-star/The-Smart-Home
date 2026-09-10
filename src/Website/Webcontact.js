import React, { useState } from "react";
import axios from "axios";
import "../Website css/Webcontact.css";
import Swal from "sweetalert2";
import Navebarhome from "./Navebarhome";
import FooterNavbar from "./FooterNavbar";

const Webcontact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/contact/create",
        formData
      );

      if (res.data && res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully!",
          text: "Thank you for reaching out. Our team will contact you shortly.",
          timer: 2500,
          showConfirmButton: false,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not send message. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="wholecontactpage">
        <Navebarhome />

        {/* HERO BANNER */}
        <div className="contact-hero-banner">
          <h1>Get In Touch With Us</h1>
          <p>
            Have a question, feedback, or need assistance with your order? Our team is available 24/7 to help you.
          </p>
        </div>

        <section className="contact-section">
          <div className="contact-container">
            {/* LEFT SIDE CONTACT CARDS */}
            <div className="contact-info">
              <h2 style={{ fontSize: "32px", color: "#ffffff", fontWeight: "800", margin: "0 0 10px 0" }}>
                Contact Information
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "15px", margin: "0 0 25px 0" }}>
                Reach out to us via any of our channels below.
              </p>

              <div className="contact-info-cards">
                <div className="info-card-item">
                  <div className="icon-wrapper-circle">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="info-text-content">
                    <h4>Phone Number</h4>
                    <p>+91 93427 98071</p>
                  </div>
                </div>

                <div className="info-card-item">
                  <div className="icon-wrapper-circle">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="info-text-content">
                    <h4>Email Address</h4>
                    <p>muthurajaguru05@gmail.com</p>
                  </div>
                </div>

                <div className="info-card-item">
                  <div className="icon-wrapper-circle">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="info-text-content">
                    <h4>Store Location</h4>
                    <p>Chennai, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="info-card-item">
                  <div className="icon-wrapper-circle">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div className="info-text-content">
                    <h4>Working Hours</h4>
                    <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* SOCIAL MEDIA */}
              <div className="social-links-modern">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE CONTACT FORM */}
            <div className="contact-form-wrapper">
              <h3>Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="form-inputs-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="modern-form-input"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="modern-form-input"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="modern-form-input"
                  required
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="modern-form-input"
                  required
                />

                <textarea
                  rows="4"
                  name="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="modern-form-textarea"
                  required
                />

                <button type="submit" className="submit-message-btn" disabled={submitting}>
                  {submitting ? (
                    "Sending Message..."
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MAP LOCATION */}
        <div className="map-section-container">
          <div className="map-card-wrapper">
            <h3>
              <i className="fa-solid fa-map-location-dot" style={{ color: "#ff6b00" }}></i> Find Our Shop Location
            </h3>
            <iframe
              title="Shop Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d80.06892494999999!3d13.04752545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="map-iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <FooterNavbar />
      </div>
    </>
  );
};

export default Webcontact;