import { useEffect, useState } from "react";
import Admin from "./Admin";
import "./Adminpannel.css/User.css";
import axios from "axios";

function User() {
  const [getcat, setGetCat] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/registers"
      );

      setGetCat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 10;
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;

const currentUsers = getcat.slice(
  indexOfFirstUser,
  indexOfLastUser
);

const totalPages = Math.ceil(getcat.length / usersPerPage);

  return (
    <div className="main-layout">
      <div className="sidebar">
        <Admin />
      </div>

      <div className="content">
        <div className="top-section">
          <div className="total-userbox">
            <span>Total Users</span>
            <h2>{getcat.length}</h2>
          </div>

          <div className="wholeuser">
            <i className="fa-solid fa-users"></i>
            <h2 className="userh2">USER MANAGEMENT</h2>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-scroll-area">
            <table className="usertable">
              <thead>
                <tr>
                  <th>S No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((a, index) => (
                  <tr key={a._id || index}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td style={{ textAlign: "left", paddingLeft: "30px" }}>
                      <span className="user-avatar-badge">
                        {a.name ? a.name.charAt(0).toUpperCase() : "U"}
                      </span>
                      {a.name}
                    </td>
                    <td>{a.email}</td>
                    <td>{a.contact || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination-baruser">
              <button
                className="page-btnuser"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <i className="fa-solid fa-chevron-left"></i> Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-btnuser ${
                    currentPage === index + 1 ? "active-page" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="page-btnuser"
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

export default User;