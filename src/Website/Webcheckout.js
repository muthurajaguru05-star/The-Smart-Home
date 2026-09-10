import React, { useEffect, useState } from "react";
import Navebar from "./Navebar";
import FooterNavbar from "./FooterNavbar";
import "../Website css/Webcheckout.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Webcheckout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const cleanNumber = (value) =>
    Number(String(value ?? "").replace(/[₹,]/g, "")) || 0;

  useEffect(() => {
    const name = localStorage.getItem("name");

    if (!name) {
      navigate("/login");
      return;
    }

    const cartKey = `cart_${name}`;

    const cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    setCartItems(cart);

    const total = cart.reduce((sum, item) => {
      const price = cleanNumber(item.price);
      const qty = Number(item.qty) || 1;

      return sum + price * qty;
    }, 0);

    setSubtotal(total);
  }, [navigate]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (isPlacingOrder) return;

    const form = e.target;

    const username =
      localStorage.getItem("name") ||
      form.elements.customerName.value;

    const userEmail =
      localStorage.getItem("email") || "";

    const contact =
      form.elements.contact.value.trim();

    const address =
      form.elements.address.value.trim();

    if (!contact || !address) {
      Swal.fire({
        title: "Missing Details",
        text: "Please enter your mobile number and address.",
        icon: "warning",
        confirmButtonText: "OK",
      });

      return;
    }

    if (cartItems.length === 0) {
      Swal.fire({
        title: "Cart is Empty",
        text: "Please add products before placing an order.",
        icon: "warning",
        confirmButtonText: "Go Shopping",
      }).then(() => {
        navigate("/webhome");
      });

      return;
    }

    const orderData = {
      name: username,
      email: userEmail,
      contact,
      address,

      items: cartItems.map((item) => ({
        title: item.title,
        price: cleanNumber(item.price),
        qty: Number(item.qty) || 1,
        image: item.image,
      })),

      totalAmount: subtotal,
      paymentMethod,
    };

    try {
      setIsPlacingOrder(true);

      const res = await fetch(
        "http://localhost:5001/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        await Swal.fire({
          title: "Order Placed!",
          text: `Your order has been placed with ${paymentMethod}.`,
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#ff3b30",
        });

        const username =
          localStorage.getItem("name");

        localStorage.removeItem(
          `cart_${username}`
        );

        window.dispatchEvent(
          new Event("cartUpdated")
        );

        if (paymentMethod === "UPI") {
          navigate("/payment");
        } else {
          navigate("/myorders");
        }
      } else {
        Swal.fire({
          title: "Order Failed",
          text:
            data.error ||
            "Something went wrong while placing your order.",
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Server Error",
        text:
          "Unable to connect to the server. Please try again.",
        icon: "error",
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const loggedInName =
    localStorage.getItem("name") || "";

  const loggedInContact =
    localStorage.getItem("contact") || "";

  return (
    <>
      <Navebar />

      <main className="checkout-page">

        {/* Background animated elements */}
        <div className="checkout-bg-circle circle-one"></div>
        <div className="checkout-bg-circle circle-two"></div>
        <div className="checkout-bg-circle circle-three"></div>

        <div className="checkoutdiv">

          {/* TITLE */}
          <div className="checkout-title-wrapper">
            <span className="checkout-small-title">
              COMPLETE YOUR PURCHASE
            </span>

            <h2>Checkout Page</h2>

            <div className="checkout-title-line"></div>
          </div>

          <form
            className="checkoutform"
            onSubmit={handleOrder}
          >

            {/* CUSTOMER DETAILS */}
            <div className="checkout-section">

              <div className="checkout-section-title">
                <span className="checkout-step">
                  01
                </span>

                <div>
                  <h3>Customer Details</h3>
                  <p>
                    Enter your delivery information
                  </p>
                </div>
              </div>

              <div className="checkout-input-group">

                <div className="checkout-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter your full name"
                    className="checkname"
                    defaultValue={loggedInName}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label>Mobile Number</label>

                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter mobile number"
                    className="checkoutnumber"
                    defaultValue={loggedInContact}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>

              </div>

              <div className="checkout-field">
                <label>Delivery Address</label>

                <textarea
                  name="address"
                  placeholder="Enter your complete delivery address"
                  className="checkoutaddress"
                  required
                ></textarea>
              </div>

            </div>

            {/* PAYMENT */}
            <div className="checkout-section">

              <div className="checkout-section-title">
                <span className="checkout-step">
                  02
                </span>

                <div>
                  <h3>Payment Method</h3>
                  <p>
                    Select your preferred payment option
                  </p>
                </div>
              </div>

              <div className="checkout-payment">

                <label
                  className={`payment-option ${
                    paymentMethod === "COD"
                      ? "active-payment"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={
                      paymentMethod === "COD"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span className="payment-radio"></span>

                  <span className="payment-icon">
                    💵
                  </span>

                  <span className="payment-text">
                    <strong>
                      Cash on Delivery
                    </strong>

                    <small>
                      Pay when your order arrives
                    </small>
                  </span>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "UPI"
                      ? "active-payment"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={
                      paymentMethod === "UPI"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <span className="payment-radio"></span>

                  <span className="payment-icon">
                    📱
                  </span>

                  <span className="payment-text">
                    <strong>
                      UPI Payment
                    </strong>

                    <small>
                      Pay securely using UPI
                    </small>
                  </span>
                </label>

              </div>

            </div>

            {/* ORDER SUMMARY */}
            <div className="checkout-section">

              <div className="checkout-section-title">
                <span className="checkout-step">
                  03
                </span>

                <div>
                  <h3>Order Summary</h3>
                  <p>
                    Review your selected products
                  </p>
                </div>
              </div>

              <div className="checkout-products">

                {cartItems.length === 0 ? (
                  <div className="checkout-empty">
                    <div>🛒</div>
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map(
                    (item, index) => {
                      const price =
                        cleanNumber(
                          item.price
                        );

                      const qty =
                        Number(item.qty) || 1;

                      return (
                        <div
                          key={index}
                          className="checkout-product"
                        >

                          <div className="checkout-product-image">
                            <img
                              src={item.image}
                              alt={item.title}
                            />

                            <span>
                              {qty}
                            </span>
                          </div>

                          <div className="checkout-product-info">
                            <h4>
                              {item.title}
                            </h4>

                            <p>
                              Quantity: {qty}
                            </p>
                          </div>

                          <div className="checkout-product-price">
                            ₹
                            {(
                              price * qty
                            ).toLocaleString()}
                          </div>

                        </div>
                      );
                    }
                  )
                )}

                <div className="checkout-total-box">

                  <div className="checkout-total-row">
                    <span>
                      Sub Total
                    </span>

                    <span>
                      ₹
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="checkout-total-row">
                    <span>
                      Delivery
                    </span>

                    <span className="delivery-free">
                      FREE
                    </span>
                  </div>

                  <div className="checkout-total-row final-total">
                    <span>
                      Total Amount
                    </span>

                    <span>
                      ₹
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* PLACE ORDER */}
            <button
              type="submit"
              className={`checkoutbtn ${
                isPlacingOrder
                  ? "placing-order"
                  : ""
              }`}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? (
                <>
                  <span className="loading-spinner"></span>
                  Placing Order...
                </>
              ) : (
                <>
                  <span>
                    Place Order
                  </span>

                  <span className="order-arrow">
                    →
                  </span>
                </>
              )}
            </button>

            <p className="checkout-secure">
              🔒 Your order information is
              securely processed
            </p>

          </form>
        </div>
      </main>

      <FooterNavbar />
    </>
  );
}

export default Webcheckout;