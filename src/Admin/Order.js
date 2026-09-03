import Admin from "./Admin";
import "./Adminpannel.css/Order.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Order() {
    const [getcat, setCatGet] = useState([]);
    const length=getcat.length;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get("http://localhost:5001/api/orders")
            .then(res => {
                setCatGet(res.data);
            })
            .catch(err => console.log("Error: " + err));
    };

    const [currentPage, setCurrentPage] = useState(1);
const ordersPerPage = 8;

const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

const currentOrders = getcat.slice(
  indexOfFirstOrder,
  indexOfLastOrder
);

const totalPages = Math.ceil(getcat.length / ordersPerPage);

    return (
        <div className="mainorder">
            <Admin />

            <div className="ordercontent">
                <div className="totalorders">
                    <span>Total Orders</span>
                    <h2>{length}</h2>
                </div>
                <div className="wholeorder">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <h2>ORDERS</h2>
                </div>

                <table className="ordertable">
                    <thead>
                        <tr>
                            <th>S No</th>
                            <th>Name</th>
                            {/* <th>Email</th> */}
                            <th>Contact</th>
                            <th>Address</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentOrders.map((a, index) => (
                            <tr key={a._id}>
                                <td>{indexOfFirstOrder + index + 1}</td>
                                <td>{a.name}</td>
                                {/* <td>{a.email}</td> */}
                                <td>{a.contact}</td>
                                <td>{a.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
  <div className="pagination-barorder">

    <button
      className="page-btnorder"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={`page-btnorder ${
          currentPage === index + 1 ? "active-page" : ""
        }`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

    <button
      className="page-btnorder"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
    >
      Next
    </button>

  </div>
)}
        </div>
    );
}

export default Order;