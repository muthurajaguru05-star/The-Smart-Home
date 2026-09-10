import React, { useState, useEffect } from "react";
import "./Adminpannel.css/Addcategory.css";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Admin from "./Admin";

function Addcategory() {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state;

  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (editData) {
      setCategory(editData.name);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      return Swal.fire({
        icon: "warning",
        title: "Required Field",
        text: "Please enter a category name",
      });
    }

    const formData = new FormData();
    formData.append("category", category);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5001/api/categores/${editData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          title: "Updated Successfully",
          text: "Category has been updated",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axios.post(
          "http://localhost:5001/api/categores",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          title: "Added Successfully",
          text: "New category created",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/Categore");
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

      <div className="wholeaddcat">
        <div className="addcatcard">
          {/* LEFT SIDE decorative panel */}
          <div className="addcatleft">
            <div className="left-header">
              <span className="badge-tag">ADMIN PORTAL</span>
              <h1>Smart Home</h1>
              <h3>{isEdit ? "Update Category" : "New Category"}</h3>
            </div>

            <p>
              Organize your smart devices seamlessly. Define categories to streamline inventory browsing.
            </p>

            <div className="floating-shape shape1"></div>
            <div className="floating-shape shape2"></div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="addcatright">
            <div className="form-top-nav">
              <Link to="/Categore" className="back-link">
                <i className="fa-solid fa-arrow-left"></i> Back to Categories
              </Link>
            </div>

            <h2 className="title">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="addcatlabel">Category Name</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-layer-group field-icon"></i>
                  <input
                    className="addcatinput"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Smart Lighting, Security, Audio"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="addcatlabel">Category Image</label>
                <div className="file-upload-box">
                  <input
                    id="cat-file-input"
                    className="file-hidden-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="cat-file-input" className="file-custom-label">
                    {preview ? (
                      <div className="preview-container">
                        <img src={preview} alt="Category Preview" className="img-preview" />
                        <span>Change Image</span>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <i className="fa-solid fa-cloud-arrow-up upload-icon"></i>
                        <span>Click to upload image</span>
                        <small>PNG, JPG, WEBP up to 5MB</small>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button type="submit" className="addcategorybutton">
                <i className={isEdit ? "fa-solid fa-floppy-disk" : "fa-solid fa-plus"}></i>
                {isEdit ? "Save Changes" : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addcategory;