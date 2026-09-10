import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navebar from "./Navebar";
import FooterNavbar from "./FooterNavbar";
import "../Website css/Webcart.css";

function Webcart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("name");

    if (!username) {
      navigate("/login");
      return;
    }

    const cartKey = `cart_${username}`;
    const storedCart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    setCartItems(storedCart);
  }, [navigate]);

  const updateCart = (updatedCart) => {
    const username = localStorage.getItem("name");

    if (!username) return;

    const cartKey = `cart_${username}`;

    setCartItems(updatedCart);

    localStorage.setItem(
      cartKey,
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (index) => {
    const updated = [...cartItems];

    updated[index].qty =
      (updated[index].qty || 1) + 1;

    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];

    updated[index].qty = Math.max(
      1,
      (updated[index].qty || 1) - 1
    );

    updateCart(updated);
  };

  const removeItem = (index) => {
    const updated = cartItems.filter(
      (_, i) => i !== index
    );

    updateCart(updated);
  };

  const subtotal = cartItems.reduce(
    (total, item) => {
      const price =
        Number(
          String(item.price || 0).replace(
            /[₹,]/g,
            ""
          )
        ) || 0;

      const qty = Number(item.qty) || 1;

      return total + price * qty;
    },
    0
  );

  return (
    <>
      <Navebar />

      <div className="webcart-container">

        {/* HEADER */}
        <div className="webcart-header">
          <Link
            to="/webhome"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            HOME
          </Link>

          <span>&nbsp; / &nbsp;</span>
          <span>CART</span>
        </div>

        {/* CONTENT */}
        <div
          className={`webcart-content ${
            cartItems.length === 0
              ? "empty-cart"
              : ""
          }`}
        >

          {/* EMPTY CART */}
          {cartItems.length === 0 ? (
            <div className="empty-cart-box">
              <div className="empty-cart-icon">
                🛒
              </div>

              <h2>CART IS EMPTY</h2>

              <p>
                Your shopping cart is waiting for
                some amazing products.
              </p>

              <button
                className="webcheckout-btn"
                onClick={() =>
                  navigate("/webhome")
                }
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* LEFT SIDE */}
              <div className="webcart-left">

                {cartItems.map((item, index) => {
                  const price =
                    Number(
                      String(
                        item.price || 0
                      ).replace(
                        /[₹,]/g,
                        ""
                      )
                    ) || 0;

                  const qty =
                    Number(item.qty) || 1;

                  return (
                    <div
                      key={index}
                      className="webcart-product"
                    >

                      {/* IMAGE */}
                      <div className="webcart-image-wrapper">
                        <img
                          src={item.image}
                          alt={item.title}
                          onClick={() =>
                            navigate(
                              `/product/${item._id}`
                            )
                          }
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="webproduct-details">

                        <h3>
                          {item.title}
                        </h3>

                        <div className="webqty-box">
                          <button
                            onClick={() =>
                              decreaseQty(index)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span>
                            {qty}
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(index)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="webremove-btn"
                          onClick={() =>
                            removeItem(index)
                          }
                        >
                          Remove
                        </button>
                      </div>

                      {/* PRICE */}
                      <div className="webprice">

                        <h3>
                          {qty} × ₹
                          {price.toLocaleString()}
                        </h3>

                        <h2>
                          ₹
                          {(
                            price * qty
                          ).toLocaleString()}
                        </h2>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT SIDE */}
              <div className="webcart-right">

                <h2>
                  Order Summary (
                  {cartItems.length}{" "}
                  {cartItems.length === 1
                    ? "item"
                    : "items"}
                  )
                </h2>

                <hr />

                {cartItems.map(
                  (item, index) => {
                    const price =
                      Number(
                        String(
                          item.price || 0
                        ).replace(
                          /[₹,]/g,
                          ""
                        )
                      ) || 0;

                    return (
                      <div
                        key={index}
                        className="websummary-row"
                      >
                        <span>
                          {item.title?.length >
                          20
                            ? item.title.substring(
                                0,
                                20
                              ) + "..."
                            : item.title}
                        </span>

                        <span>
                          {item.qty || 1} × ₹
                          {price.toLocaleString()}
                        </span>
                      </div>
                    );
                  }
                )}

                <hr />

                <div className="websummary-row">
                  <span>
                    Sub Total
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="websummary-row">
                  <span>
                    Delivery
                  </span>

                  <span className="free-delivery">
                    Free
                  </span>
                </div>

                <hr />

                <div className="websummary-row total">
                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <button
                  className="webcheckout-btn"
                  onClick={() =>
                    navigate("/checkout")
                  }
                >
                  <span>
                    Proceed to Checkout
                  </span>
                  <span className="checkout-arrow">
                    →
                  </span>
                </button>

              </div>
            </>
          )}
        </div>
      </div>

      <FooterNavbar />
    </>
  );
}

export default Webcart;