import { useEffect, useState } from "react";
import Admin from "./Admin";
import "./Adminpannel.css/Category.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Categore() {

  const [catget, setCatGet] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    category();
  }, []);

  const category = () => {
    axios.get("http://localhost:5001/api/categores")
      .then(res => setCatGet(res.data))
      .catch(err => console.log(err));
  };

  // ✅ EDIT CLICK
  const handleEdit = (item) => {
    navigate("/addcategory", { state: item });
  };

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`http://localhost:5001/api/categores/${id}`)
        .then(() => {
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          category(); // refresh list
        })
        .catch((err) => console.log(err));
    }
  });
};

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = catget.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(catget.length / itemsPerPage);

  return (
    <div className="maincontainer">
      <div className="sidebar">
        <Admin />
      </div>

      <div className="content">
        <div className="topbar">
          <div className="total-box">
            <span className="categorytotalspan">Total Category</span>
            <h2 className="cath2">{catget.length}</h2>
          </div>

          <div className="categorehead">
            <i className="fa-solid fa-layer-group"></i>
            <h2>CATEGORY</h2>
          </div>

          <button className="addcategory">
            <Link to="/addcategory">
              <i className="fa-solid fa-plus"></i> Add Category
            </Link>
          </button>
        </div>

        <div className="table-wrapper">
          <div className="table-scroll-area">
            <table className="categoretable">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentCategories.map((a, index) => (
                  <tr key={a._id || index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{a.name}</td>
                    <td>
                      <button className="editbtn" onClick={() => handleEdit(a)}>
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>

                      <button onClick={() => handleDelete(a._id)} className="deletebtn">
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination-bar">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <i className="fa-solid fa-chevron-left"></i> Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active-page" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categore;