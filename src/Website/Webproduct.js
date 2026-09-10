import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navebar from "./Navebar";
import "../Website css/Webproduct.css";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import FooterNavbar from "./FooterNavbar";

function Webproduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setproduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

    // CATEGORY
    useEffect(() => {
    axios
      .get("http://localhost:5001/api/categores")
      .then((res) => setcategory(res.data))
      .catch((err) => console.log(err));
   }, []);

   // PRODUCT
    useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => {
        setproduct(res.data);
        setFilterProduct(res.data);
      })
      .catch((err) => console.log(err));
   }, []);

      // AUTO FILTER
     useEffect(() => {
     if (location.state?.category && product.length > 0) {
      const cat = location.state.category;
      setSelectedCategory(cat);
      setFilterProduct(
        product.filter((item) => item.category === cat)
      );
      setCurrentPage(1);
    }
    }, [location.state, product]);

    // FILTER
    const filterCategory = (catName) => {
     setSelectedCategory(catName);
     setFilterProduct(
      product.filter((item) => item.category === catName)
     );
     setCurrentPage(1);
    };

    // CLEAR FILTER
  const clearFilter = () => {
    setSelectedCategory("");
    setFilterProduct(product);
    setCurrentPage(1);
    };

   // ADD TO CART
  const addToCart = (item) => {
    const username = localStorage.getItem("name");

      if (!username) {
        Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first",
      });

      navigate("/login");
      return;
    }

    const cartKey = `cart_${username}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existingItem = cart.find((p) => p._id === item._id);

      if (existingItem) {
      existingItem.qty += 1;
    } else {
        cart.push({
        _id: item._id,
        title: item.title,
        image: item.image,
        price: item.price,
        oldprice: item.oldprice,
        qty: 1,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added To Cart Successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // PAGINATION

  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts = filterProduct.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    filterProduct.length / itemsPerPage
  );

  return (
    <>
      <Navebar />

      <div className="product-page">
        <div className="productbox">
          <span className="product-title">
            {selectedCategory || "Shop By Category"}
          </span>
        </div>

        <div className="productmain-layout">
          {/* CATEGORY */}
          <div className="category-section">
            <h2>All Category</h2>

            <button
              className="clear-btn"
              onClick={clearFilter}
            >
              Clear Filter
            </button>

            <div className="category-list">
              {category.map((value) => (
                <button
                  key={value._id}
                  className={`category-btn ${
                    selectedCategory === value.name
                      ? "active-category"
                      : ""
                  }`}
                  onClick={() =>
                    filterCategory(value.name)
                  }
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT */}
          <div className="product-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map((value) => (
                <div
                  className="webproduct-card"
                  key={value._id}
                  onClick={() =>
                    navigate(`/product/${value._id}`)
                  }
                >
                  <div className="image-box">
                    <img
                      src={value.image}
                      alt={value.title}
                    />

                    <span className="offer-badge">
                      {value.offer}% OFF
                    </span>

                    <div className="hover-icons">
                      <div
                        className="icon-circle"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(value);
                        }}
                      >
                        <FaShoppingCart />
                      </div>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3>{value.title}</h3>

                    <p>{value.category}</p>

                    <div className="price-box">
                      <span className="price">
                        ₹{value.price}
                      </span>

                      <span className="oldprice">
                        ₹{value.oldprice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2>No Products Found</h2>
            )}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination-barwepproduct">
          <button
            className="page-btnwebproduct"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-btnwebproduct ${
                currentPage === index + 1
                  ? "active-page"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btnwebproduct"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
          >
            Next
          </button>
        </div>
      )}

      <FooterNavbar />
    </>
  );
}

export default Webproduct;