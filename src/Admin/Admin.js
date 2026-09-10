import "./Adminpannel.css/Admin.css";
import male from "./adminimage/malecorton.jpg";
import { Link, useLocation } from "react-router-dom";

function Admin() {
    const location = useLocation();

    return (
        <>
            <div className="admindashboard">

                <img src={male} className="adminmale" alt="" />

                <div className="online">
                    <i className="fa-solid fa-rotate"></i>
                    <span>Online</span>
                </div>

                <div className="dikbox">
                    <h3>Admin</h3>

                    <i className="fa-solid fa-envelope-open-text"
                        style={{
                            color: "rgb(9, 166, 118)",
                            fontSize: "26px"
                        }}
                    ></i>
                </div>

                <div className="adminmenu">
                    <button className={`adminbtn ${location.pathname === "/dashboard" ? "active" : ""}`}>
                        <Link to="/dashboard" className="adminlink">Dashboard</Link>
                        <i className="fa-solid fa-gauge-high"></i>
                    </button>

                    <button className={`adminbtn ${location.pathname === "/product" ? "active" : ""}`}>
                        <Link to="/product" className="adminlink">Product</Link>
                        <i className="fa-solid fa-box"></i>
                    </button>

                    <button className={`adminbtn ${location.pathname === "/categore" ? "active" : ""}`}>
                        <Link to="/categore" className="adminlink">Category</Link>
                        <i className="fa-solid fa-layer-group"></i>
                    </button>

                    <button className={`adminbtn ${location.pathname === "/user" ? "active" : ""}`}>
                        <Link to="/user" className="adminlink">User</Link>
                        <i className="fa-solid fa-user"></i>
                    </button>

                    <button className={`adminbtn ${location.pathname === "/order" ? "active" : ""}`}>
                        <Link to="/order" className="adminlink">Orders</Link>
                        <i className="fa-solid fa-bag-shopping"></i>
                    </button>

                    <button className="adminbtn logout-btn">
                        <Link to="/logout" className="adminlink">Logout</Link>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Admin;