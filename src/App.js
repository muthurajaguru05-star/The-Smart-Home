import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Routes, Route } from "react-router-dom";

import Webhome from "./Website/Webhome";
import Webproduct from "./Website/Webproduct";
import Webproductinfo from "./Website/Webproductinfo";
import Webcart from "./Website/Webcart";
import Webabout from "./Website/Webabout";


function App() {
  const [cartItems, setCartItems] = useState([]);

  // LOAD CART INITIALLY
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // SYNC CART
  const syncCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  };

  const addToCart = (product) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added To Cart Successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        _id: product._id,
        title: product.title,
        image: product.image,
        price: Number(product.price) || 0,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    syncCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="page-animated">
      <Routes>
        <Route path="/" element={<Webhome addToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/webabout" element={<Webabout />} />
        <Route path="/webproduct" element={<Webproduct addToCart={addToCart} cartItems={cartItems} />} />

        <Route path="/product/:id" element={<Webproductinfo addToCart={addToCart} cartItems={cartItems} />} />

        <Route path="/cart" element={<Webcart cartItems={cartItems} />} />
      </Routes>
    </div>
  );
}

export default App;