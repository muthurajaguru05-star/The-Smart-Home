import "./Adminpannel.css/Addproduct.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Admin from "./Admin";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state;

  const [isEdit, setIsEdit] = useState(false);
  const [getcat, setgetcat] = useState([]);

  const [title, setTitle] = useState("");
  const [categorys, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [offer, setOffer] = useState("");
  const [price, setPrice] = useState("");
  const [oldprice, setoldprice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/api/categores").then((res) => setgetcat(res.data));

    if (editData) {
      setTitle(editData.title || "");
      setCategory(editData.category || "");
      setStock(editData.stock || "");
      setDescription(editData.description || "");
      setBrand(editData.brand || "");
      setOffer(editData.offer || "");
      setPrice(editData.price || "");
      setoldprice(editData.oldprice || "");
      if (editData.image) setPreview(editData.image);
      setIsEdit(true);
    }
  }, [editData]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!title || !price) {
      return Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please provide at least Product Title and Price.",
      });
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", categorys);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("offer", offer);
    formData.append("price", price);
    formData.append("oldprice", oldprice);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5001/api/products/${editData._id}`, formData);

        Swal.fire({
          title: "Updated Successfully",
          text: "Product details have been saved",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axios.post("http://localhost:5001/api/products", formData);

        Swal.fire({
          title: "Added Successfully",
          text: "New product listed successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/product");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="maincontainer">
      <div className="sidebar">
        <Admin />
      </div>

      <div className="page">
        <div className="form-container">
          <div className="form-header-bar">
            <Link to="/product" className="back-link">
              <i className="fa-solid fa-arrow-left"></i> Back to Products
            </Link>
            <h2>
              <i className="fa-solid fa-box-open" style={{ color: "#10b981", marginRight: "10px" }}></i>
              {isEdit ? "Edit Product Details" : "Add New Product"}
            </h2>
          </div>

          <form className="product-form" onSubmit={handlesubmit}>
            <div className="form-grid">
              {/* Left Column: Essential Information */}
              <div className="form-col">
                <div className="form-group">
                  <label className="field-label">Product Name *</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-tag field-icon"></i>
                    <input
                      type="text"
                      className="productinput"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Smart LED TV 55 inch"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="field-label">Category</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-list field-icon"></i>
                      <select
                        className="productselc"
                        value={categorys}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {getcat.map((c, i) => (
                          <option key={i} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Brand</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-copyright field-icon"></i>
                      <input
                        className="productinput"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="e.g. Samsung, Philips"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label className="field-label">Price (₹) *</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-dollar-sign field-icon"></i>
                      <input
                        type="number"
                        className="productinput"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Old Price (₹)</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-arrow-down-short-wide field-icon"></i>
                      <input
                        type="number"
                        className="productinput"
                        value={oldprice}
                        onChange={(e) => setoldprice(e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Stock Qty</label>
                    <div className="input-wrapper">
                      <i className="fa-solid fa-cubes field-icon"></i>
                      <input
                        className="productinput"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="field-label">Offer Tag</label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-percent field-icon"></i>
                    <input
                      className="productinput"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      placeholder="e.g. 20% OFF or Summer Sale"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Media & Description */}
              <div className="form-col">
                <div className="form-group">
                  <label className="field-label">Product Image</label>
                  <div className="file-upload-box">
                    <input
                      id="product-file-input"
                      className="file-hidden-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="product-file-input" className="file-custom-label">
                      {preview ? (
                        <div className="preview-container">
                          <img src={preview} alt="Product Preview" className="img-preview" />
                          <span className="change-photo-txt">Click to Change Photo</span>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
                          <span>Upload Product Image</span>
                          <small>High resolution PNG, JPG, WEBP</small>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="field-label">Description</label>
                  <div className="input-wrapper" style={{ flex: 1 }}>
                    <textarea
                      className="productinput product-textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter detailed specs, features and key descriptions of the product..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="addproductbutton" type="submit">
                <i className={isEdit ? "fa-solid fa-floppy-disk" : "fa-solid fa-plus"}></i>
                {isEdit ? "Update Product Details" : "Publish Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;